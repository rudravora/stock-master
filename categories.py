from flask import Blueprint, request, jsonify
from models import db

categories_bp = Blueprint('categories', __name__, url_prefix='/api/categories')

@categories_bp.route('', methods=['GET'])
def get_categories():
    """Get all categories"""
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM categories ORDER BY name ASC')
    categories = cursor.fetchall()
    return jsonify([dict(c) for c in categories]), 200

@categories_bp.route('', methods=['POST'])
def create_category():
    """Create new category"""
    data = request.json
    
    name = data.get('name')
    description = data.get('description', '')
    
    if not name:
        return jsonify({'error': 'Category name is required'}), 400
    
    cursor = db.conn.cursor()
    
    # Check if category already exists
    cursor.execute('SELECT * FROM categories WHERE name = ?', (name,))
    if cursor.fetchone():
        return jsonify({'error': 'Category already exists'}), 400
    
    cursor.execute('''
        INSERT INTO categories (name, description)
        VALUES (?, ?)
    ''', (name, description))
    
    db.conn.commit()
    category_id = cursor.lastrowid
    
    cursor.execute('SELECT * FROM categories WHERE id = ?', (category_id,))
    category = cursor.fetchone()
    
    return jsonify(dict(category)), 201

@categories_bp.route('/<int:id>', methods=['GET'])
def get_category(id):
    """Get single category by ID"""
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM categories WHERE id = ?', (id,))
    category = cursor.fetchone()
    
    if not category:
        return jsonify({'error': 'Category not found'}), 404
    
    return jsonify(dict(category)), 200

@categories_bp.route('/<int:id>', methods=['PUT'])
def update_category(id):
    """Update category"""
    data = request.json
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM categories WHERE id = ?', (id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Category not found'}), 404
    
    name = data.get('name')
    description = data.get('description')
    
    cursor.execute('''
        UPDATE categories 
        SET name = COALESCE(?, name),
            description = COALESCE(?, description)
        WHERE id = ?
    ''', (name, description, id))
    
    db.conn.commit()
    
    cursor.execute('SELECT * FROM categories WHERE id = ?', (id,))
    category = cursor.fetchone()
    
    return jsonify(dict(category)), 200

@categories_bp.route('/<int:id>', methods=['DELETE'])
def delete_category(id):
    """Delete category"""
    cursor = db.conn.cursor()
    
    # Check if category has products
    cursor.execute('''
        SELECT COUNT(*) as count FROM products 
        WHERE category_id = ?
    ''', (id,))
    result = cursor.fetchone()
    
    if result['count'] > 0:
        return jsonify({'error': 'Cannot delete category with existing products'}), 400
    
    cursor.execute('DELETE FROM categories WHERE id = ?', (id,))
    db.conn.commit()
    
    return jsonify({'message': 'Category deleted successfully'}), 200

@categories_bp.route('/<int:id>/products', methods=['GET'])
def get_category_products(id):
    """Get all products in a category"""
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM categories WHERE id = ?', (id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Category not found'}), 404
    
    cursor.execute('''
        SELECT * FROM products 
        WHERE category_id = ?
        ORDER BY name ASC
    ''', (id,))
    
    products = cursor.fetchall()
    return jsonify([dict(p) for p in products]), 200

from flask import Blueprint, request, jsonify
from models import db

products_bp = Blueprint('products', __name__, url_prefix='/api/products')

@products_bp.route('', methods=['GET'])
def get_products():
    """Get all products"""
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM products ORDER BY created_at DESC')
    products = cursor.fetchall()
    return jsonify([dict(p) for p in products]), 200

@products_bp.route('', methods=['POST'])
def create_product():
    """Create new product"""
    data = request.json
    
    name = data.get('name')
    sku = data.get('sku')
    
    if not all([name, sku]):
        return jsonify({'error': 'Name and SKU are required'}), 400
    
    category_id = data.get('category_id')  # CHANGED
    unit_of_measure = data.get('unit_of_measure', 'units')
    current_stock = data.get('current_stock', 0)
    reorder_level = data.get('reorder_level', 10)
    
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM products WHERE sku = ?', (sku,))
    if cursor.fetchone():
        return jsonify({'error': 'SKU already exists'}), 400
    
    cursor.execute('''
        INSERT INTO products (name, sku, category_id, unit_of_measure, current_stock, reorder_level)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (name, sku, category_id, unit_of_measure, current_stock, reorder_level))
    
    db.conn.commit()
    product_id = cursor.lastrowid
    
    cursor.execute('SELECT * FROM products WHERE id = ?', (product_id,))
    product = cursor.fetchone()
    
    return jsonify(dict(product)), 201

@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    """Get single product by ID"""
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM products WHERE id = ?', (id,))
    product = cursor.fetchone()
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    return jsonify(dict(product)), 200

@products_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    """Update product details"""
    data = request.json
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM products WHERE id = ?', (id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Product not found'}), 404
    
    name = data.get('name')
    category_id = data.get('category_id')
    unit_of_measure = data.get('unit_of_measure')
    reorder_level = data.get('reorder_level')
    
    cursor.execute('''
        UPDATE products 
        SET name = COALESCE(?, name),
            category_id = COALESCE(?, category_id),
            unit_of_measure = COALESCE(?, unit_of_measure),
            reorder_level = COALESCE(?, reorder_level)
        WHERE id = ?
    ''', (name, category_id, unit_of_measure, reorder_level, id))
    
    db.conn.commit()
    
    cursor.execute('SELECT * FROM products WHERE id = ?', (id,))
    product = cursor.fetchone()
    
    return jsonify(dict(product)), 200

@products_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    """Delete product"""
    cursor = db.conn.cursor()
    cursor.execute('DELETE FROM products WHERE id = ?', (id,))
    db.conn.commit()
    return jsonify({'message': 'Product deleted'}), 200
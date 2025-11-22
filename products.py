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
    
    # Validate required fields
    name = data.get('name')
    sku = data.get('sku')
    
    if not all([name, sku]):
        return jsonify({'error': 'Name and SKU are required'}), 400
    
    # Optional fields with defaults
    category = data.get('category', '')
    unit_of_measure = data.get('unit_of_measure', 'units')
    current_stock = data.get('current_stock', 0)
    reorder_level = data.get('reorder_level', 10)
    
    cursor = db.conn.cursor()
    
    # Check if SKU already exists
    cursor.execute('SELECT * FROM products WHERE sku = ?', (sku,))
    if cursor.fetchone():
        return jsonify({'error': 'SKU already exists'}), 400
    
    # Insert product
    cursor.execute('''
        INSERT INTO products (name, sku, category, unit_of_measure, current_stock, reorder_level)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (name, sku, category, unit_of_measure, current_stock, reorder_level))
    
    db.conn.commit()
    product_id = cursor.lastrowid
    
    # Return created product
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

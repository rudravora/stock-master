from flask import Blueprint, request, jsonify
from models import db

warehouses_bp = Blueprint('warehouses', __name__, url_prefix='/api/warehouses')

@warehouses_bp.route('', methods=['GET'])
def get_warehouses():
    """Get all warehouses"""
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM warehouses ORDER BY name ASC')
    warehouses = cursor.fetchall()
    return jsonify([dict(w) for w in warehouses]), 200

@warehouses_bp.route('', methods=['POST'])
def create_warehouse():
    """Create new warehouse"""
    data = request.json
    
    name = data.get('name')
    code = data.get('code')
    address = data.get('address', '')
    
    if not all([name, code]):
        return jsonify({'error': 'Name and code are required'}), 400
    
    cursor = db.conn.cursor()
    
    # Check if code already exists
    cursor.execute('SELECT * FROM warehouses WHERE code = ?', (code,))
    if cursor.fetchone():
        return jsonify({'error': 'Warehouse code already exists'}), 400
    
    cursor.execute('''
        INSERT INTO warehouses (name, code, address)
        VALUES (?, ?, ?)
    ''', (name, code, address))
    
    db.conn.commit()
    warehouse_id = cursor.lastrowid
    
    cursor.execute('SELECT * FROM warehouses WHERE id = ?', (warehouse_id,))
    warehouse = cursor.fetchone()
    
    return jsonify(dict(warehouse)), 201

@warehouses_bp.route('/<int:id>', methods=['GET'])
def get_warehouse(id):
    """Get single warehouse by ID"""
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM warehouses WHERE id = ?', (id,))
    warehouse = cursor.fetchone()
    
    if not warehouse:
        return jsonify({'error': 'Warehouse not found'}), 404
    
    return jsonify(dict(warehouse)), 200

@warehouses_bp.route('/<int:id>', methods=['PUT'])
def update_warehouse(id):
    """Update warehouse"""
    data = request.json
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM warehouses WHERE id = ?', (id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Warehouse not found'}), 404
    
    name = data.get('name')
    address = data.get('address')
    
    cursor.execute('''
        UPDATE warehouses 
        SET name = COALESCE(?, name),
            address = COALESCE(?, address)
        WHERE id = ?
    ''', (name, address, id))
    
    db.conn.commit()
    
    cursor.execute('SELECT * FROM warehouses WHERE id = ?', (id,))
    warehouse = cursor.fetchone()
    
    return jsonify(dict(warehouse)), 200

@warehouses_bp.route('/<int:id>', methods=['DELETE'])
def delete_warehouse(id):
    """Delete warehouse"""
    cursor = db.conn.cursor()
    
    # Check if warehouse has stock
    cursor.execute('''
        SELECT COUNT(*) as count FROM product_locations 
        WHERE warehouse_id = ? AND quantity > 0
    ''', (id,))
    result = cursor.fetchone()
    
    if result['count'] > 0:
        return jsonify({'error': 'Cannot delete warehouse with existing stock'}), 400
    
    cursor.execute('DELETE FROM warehouses WHERE id = ?', (id,))
    db.conn.commit()
    
    return jsonify({'message': 'Warehouse deleted successfully'}), 200

@warehouses_bp.route('/<int:id>/stock', methods=['GET'])
def get_warehouse_stock(id):
    """Get all products in a warehouse with stock levels"""
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM warehouses WHERE id = ?', (id,))
    if not cursor.fetchone():
        return jsonify({'error': 'Warehouse not found'}), 404
    
    cursor.execute('''
        SELECT 
            pl.*,
            p.name as product_name,
            p.sku,
            p.category_id,
            c.name as category_name,
            p.unit_of_measure
        FROM product_locations pl
        JOIN products p ON pl.product_id = p.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE pl.warehouse_id = ?
        ORDER BY p.name ASC
    ''', (id,))
    
    stock = cursor.fetchall()
    return jsonify([dict(s) for s in stock]), 200
from flask import Blueprint, request, jsonify
from models import db
from datetime import datetime

adjustments_bp = Blueprint('adjustments', __name__, url_prefix='/api/adjustments')

@adjustments_bp.route('', methods=['GET'])
def get_adjustments():
    """Get all inventory adjustments"""
    cursor = db.conn.cursor()
    cursor.execute('''
        SELECT a.*, p.name as product_name, p.sku
        FROM inventory_adjustments a
        JOIN products p ON a.product_id = p.id
        ORDER BY a.created_at DESC
    ''')
    adjustments = cursor.fetchall()
    return jsonify([dict(a) for a in adjustments]), 200

@adjustments_bp.route('', methods=['POST'])
def create_adjustment():
    """Create inventory adjustment"""
    data = request.json
    
    product_id = data.get('product_id')
    counted_quantity = data.get('counted_quantity')
    reason = data.get('reason', '')
    
    if not all([product_id, counted_quantity is not None]):
        return jsonify({'error': 'Product ID and counted quantity required'}), 400
    
    cursor = db.conn.cursor()
    
    # Get current stock
    cursor.execute('SELECT current_stock FROM products WHERE id = ?', (product_id,))
    product = cursor.fetchone()
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    current_stock = product['current_stock']
    difference = counted_quantity - current_stock
    
    adjustment_number = f"ADJ-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # Create adjustment record
    cursor.execute('''
        INSERT INTO inventory_adjustments 
        (adjustment_number, product_id, system_quantity, counted_quantity, difference, reason)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (adjustment_number, product_id, current_stock, counted_quantity, difference, reason))
    
    adjustment_id = cursor.lastrowid
    
    # Update product stock
    cursor.execute('''
        UPDATE products 
        SET current_stock = ? 
        WHERE id = ?
    ''', (counted_quantity, product_id))
    
    # Log stock movement
    cursor.execute('''
        INSERT INTO stock_movements 
        (product_id, movement_type, quantity, reference)
        VALUES (?, 'ADJUSTMENT', ?, ?)
    ''', (product_id, difference, adjustment_number))
    
    db.conn.commit()
    
    cursor.execute('''
        SELECT a.*, p.name as product_name, p.sku
        FROM inventory_adjustments a
        JOIN products p ON a.product_id = p.id
        WHERE a.id = ?
    ''', (adjustment_id,))
    adjustment = cursor.fetchone()
    
    return jsonify(dict(adjustment)), 201
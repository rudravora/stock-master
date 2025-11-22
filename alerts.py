from flask import Blueprint, jsonify
from models import db

alerts_bp = Blueprint('alerts', __name__, url_prefix='/api/alerts')

@alerts_bp.route('/low-stock', methods=['GET'])
def get_low_stock_alerts():
    """Get all products with stock at or below reorder level"""
    cursor = db.conn.cursor()
    
    cursor.execute('''
        SELECT 
            p.*,
            c.name as category_name,
            (p.reorder_level - p.current_stock) as shortage_quantity
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.current_stock <= p.reorder_level
        ORDER BY shortage_quantity DESC
    ''')
    
    low_stock_products = cursor.fetchall()
    
    return jsonify({
        'total_alerts': len(low_stock_products),
        'products': [dict(p) for p in low_stock_products]
    }), 200

@alerts_bp.route('/out-of-stock', methods=['GET'])
def get_out_of_stock_alerts():
    """Get all products that are completely out of stock"""
    cursor = db.conn.cursor()
    
    cursor.execute('''
        SELECT 
            p.*,
            c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.current_stock = 0
        ORDER BY p.name ASC
    ''')
    
    out_of_stock_products = cursor.fetchall()
    
    return jsonify({
        'total_alerts': len(out_of_stock_products),
        'products': [dict(p) for p in out_of_stock_products]
    }), 200

@alerts_bp.route('/pending-operations', methods=['GET'])
def get_pending_operations():
    """Get summary of all pending operations"""
    cursor = db.conn.cursor()
    
    # Pending receipts
    cursor.execute('''
        SELECT COUNT(*) as count FROM receipts 
        WHERE status = 'DRAFT'
    ''')
    pending_receipts = cursor.fetchone()['count']
    
    # Pending deliveries
    cursor.execute('''
        SELECT COUNT(*) as count FROM delivery_orders 
        WHERE status = 'DRAFT'
    ''')
    pending_deliveries = cursor.fetchone()['count']
    
    # Pending transfers
    cursor.execute('''
        SELECT COUNT(*) as count FROM internal_transfers 
        WHERE status = 'DRAFT'
    ''')
    pending_transfers = cursor.fetchone()['count']
    
    return jsonify({
        'pending_receipts': pending_receipts,
        'pending_deliveries': pending_deliveries,
        'pending_transfers': pending_transfers,
        'total_pending': pending_receipts + pending_deliveries + pending_transfers
    }), 200
from flask import Blueprint, jsonify
from models import db

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/stats', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    cursor = db.conn.cursor()
    
    # Total products
    cursor.execute('SELECT COUNT(*) FROM products')
    total_products = cursor.fetchone()[0]
    
    # Low stock items (stock <= reorder level)
    cursor.execute('''
        SELECT COUNT(*) FROM products 
        WHERE current_stock <= reorder_level
    ''')
    low_stock_items = cursor.fetchone()[0]
    
    # Pending receipts
    cursor.execute('''
        SELECT COUNT(*) FROM receipts 
        WHERE status = "DRAFT"
    ''')
    pending_receipts = cursor.fetchone()[0]
    
    # Pending deliveries
    cursor.execute('''
        SELECT COUNT(*) FROM delivery_orders 
        WHERE status = "DRAFT"
    ''')
    pending_deliveries = cursor.fetchone()[0]
    
    # Total stock value (sum of all current_stock)
    cursor.execute('SELECT SUM(current_stock) FROM products')
    total_stock_units = cursor.fetchone()[0] or 0
    
    return jsonify({
        'total_products': total_products,
        'low_stock_items': low_stock_items,
        'pending_receipts': pending_receipts,
        'pending_deliveries': pending_deliveries,
        'total_stock_units': total_stock_units
    }), 200
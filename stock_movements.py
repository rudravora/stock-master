from flask import Blueprint, jsonify
from models import db

stock_movements_bp = Blueprint('stock_movements', __name__, url_prefix='/api/stock-movements')

@stock_movements_bp.route('', methods=['GET'])
def get_movements():
    """Get all stock movements with product details"""
    cursor = db.conn.cursor()
    
    cursor.execute('''
        SELECT 
            sm.*,
            p.name as product_name,
            p.sku as product_sku
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        ORDER BY sm.created_at DESC
        LIMIT 100
    ''')
    
    movements = cursor.fetchall()
    return jsonify([dict(m) for m in movements]), 200
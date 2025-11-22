from flask import Blueprint, request, jsonify
from models import db

filters_bp = Blueprint('filters', __name__, url_prefix='/api/filters')

@filters_bp.route('/products', methods=['GET'])
def filter_products():
    """Advanced product filtering"""
    category_id = request.args.get('category_id')
    warehouse_id = request.args.get('warehouse_id')
    low_stock = request.args.get('low_stock')  # 'true' or 'false'
    search = request.args.get('search')  # Search by name or SKU
    
    query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1'
    params = []
    
    if category_id:
        query += ' AND p.category_id = ?'
        params.append(category_id)
    
    if low_stock == 'true':
        query += ' AND p.current_stock <= p.reorder_level'
    
    if search:
        query += ' AND (p.name LIKE ? OR p.sku LIKE ?)'
        params.extend([f'%{search}%', f'%{search}%'])
    
    query += ' ORDER BY p.name ASC'
    
    cursor = db.conn.cursor()
    cursor.execute(query, params)
    products = cursor.fetchall()
    
    return jsonify([dict(p) for p in products]), 200

@filters_bp.route('/receipts', methods=['GET'])
def filter_receipts():
    """Advanced receipt filtering"""
    status = request.args.get('status')  # DRAFT, VALIDATED
    date_from = request.args.get('date_from')
    date_to = request.args.get('date_to')
    supplier = request.args.get('supplier')
    
    query = 'SELECT * FROM receipts WHERE 1=1'
    params = []
    
    if status:
        query += ' AND status = ?'
        params.append(status)
    
    if date_from:
        query += ' AND DATE(created_at) >= ?'
        params.append(date_from)
    
    if date_to:
        query += ' AND DATE(created_at) <= ?'
        params.append(date_to)
    
    if supplier:
        query += ' AND supplier_name LIKE ?'
        params.append(f'%{supplier}%')
    
    query += ' ORDER BY created_at DESC'
    
    cursor = db.conn.cursor()
    cursor.execute(query, params)
    receipts = cursor.fetchall()
    
    return jsonify([dict(r) for r in receipts]), 200

@filters_bp.route('/deliveries', methods=['GET'])
def filter_deliveries():
    """Advanced delivery filtering"""
    status = request.args.get('status')  # DRAFT, VALIDATED
    date_from = request.args.get('date_from')
    date_to = request.args.get('date_to')
    customer = request.args.get('customer')
    
    query = 'SELECT * FROM delivery_orders WHERE 1=1'
    params = []
    
    if status:
        query += ' AND status = ?'
        params.append(status)
    
    if date_from:
        query += ' AND DATE(created_at) >= ?'
        params.append(date_from)
    
    if date_to:
        query += ' AND DATE(created_at) <= ?'
        params.append(date_to)
    
    if customer:
        query += ' AND customer_name LIKE ?'
        params.append(f'%{customer}%')
    
    query += ' ORDER BY created_at DESC'
    
    cursor = db.conn.cursor()
    cursor.execute(query, params)
    deliveries = cursor.fetchall()
    
    return jsonify([dict(d) for d in deliveries]), 200

@filters_bp.route('/stock-movements', methods=['GET'])
def filter_stock_movements():
    """Advanced stock movement filtering"""
    product_id = request.args.get('product_id')
    movement_type = request.args.get('movement_type')  # RECEIPT, DELIVERY, TRANSFER, ADJUSTMENT
    date_from = request.args.get('date_from')
    date_to = request.args.get('date_to')
    
    query = '''
        SELECT 
            sm.*,
            p.name as product_name,
            p.sku as product_sku
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        WHERE 1=1
    '''
    params = []
    
    if product_id:
        query += ' AND sm.product_id = ?'
        params.append(product_id)
    
    if movement_type:
        query += ' AND sm.movement_type = ?'
        params.append(movement_type)
    
    if date_from:
        query += ' AND DATE(sm.created_at) >= ?'
        params.append(date_from)
    
    if date_to:
        query += ' AND DATE(sm.created_at) <= ?'
        params.append(date_to)
    
    query += ' ORDER BY sm.created_at DESC LIMIT 500'
    
    cursor = db.conn.cursor()
    cursor.execute(query, params)
    movements = cursor.fetchall()
    
    return jsonify([dict(m) for m in movements]), 200
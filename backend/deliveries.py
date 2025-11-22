from flask import Blueprint, request, jsonify
from models import db
from datetime import datetime

deliveries_bp = Blueprint('deliveries', __name__, url_prefix='/api/deliveries')

@deliveries_bp.route('', methods=['GET'])
def get_deliveries():
    """Get all delivery orders with items"""
    cursor = db.conn.cursor()
    
    cursor.execute('''
        SELECT * FROM delivery_orders 
        ORDER BY created_at DESC
    ''')
    deliveries = cursor.fetchall()
    
    result = []
    for delivery in deliveries:
        cursor.execute('''
            SELECT di.*, p.name as product_name, p.sku
            FROM delivery_items di
            JOIN products p ON di.product_id = p.id
            WHERE di.delivery_id = ?
        ''', (delivery['id'],))
        items = cursor.fetchall()
        
        delivery_dict = dict(delivery)
        delivery_dict['items'] = [dict(item) for item in items]
        result.append(delivery_dict)
    
    return jsonify(result), 200

@deliveries_bp.route('', methods=['POST'])
def create_delivery():
    """Create new delivery order (DRAFT status)"""
    data = request.json
    
    customer_name = data.get('customer_name')
    items = data.get('items', [])
    
    if not customer_name:
        return jsonify({'error': 'Customer name required'}), 400
    
    if not items or len(items) == 0:
        return jsonify({'error': 'At least one product required'}), 400
    
    cursor = db.conn.cursor()
    
    # Generate order number
    order_number = f"DEL-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # Create delivery order
    cursor.execute('''
        INSERT INTO delivery_orders (order_number, customer_name, status)
        VALUES (?, ?, 'DRAFT')
    ''', (order_number, customer_name))
    
    delivery_id = cursor.lastrowid
    
    # Add items
    for item in items:
        product_id = item.get('product_id')
        quantity = item.get('quantity', 0)
        
        if not product_id or quantity <= 0:
            continue
        
        cursor.execute('''
            INSERT INTO delivery_items (delivery_id, product_id, quantity)
            VALUES (?, ?, ?)
        ''', (delivery_id, product_id, quantity))
    
    db.conn.commit()
    
    # Return created delivery with items
    cursor.execute('SELECT * FROM delivery_orders WHERE id = ?', (delivery_id,))
    delivery = cursor.fetchone()
    
    cursor.execute('''
        SELECT di.*, p.name as product_name, p.sku
        FROM delivery_items di
        JOIN products p ON di.product_id = p.id
        WHERE di.delivery_id = ?
    ''', (delivery_id,))
    items = cursor.fetchall()
    
    delivery_dict = dict(delivery)
    delivery_dict['items'] = [dict(item) for item in items]
    
    return jsonify(delivery_dict), 201

@deliveries_bp.route('/<int:id>/validate', methods=['POST'])
def validate_delivery(id):
    """
    🔥 CRITICAL: Validate delivery and DECREASE stock
    """
    cursor = db.conn.cursor()
    
    # Get delivery
    cursor.execute('SELECT * FROM delivery_orders WHERE id = ?', (id,))
    delivery = cursor.fetchone()
    
    if not delivery:
        return jsonify({'error': 'Delivery not found'}), 404
    
    if delivery['status'] == 'VALIDATED':
        return jsonify({'error': 'Delivery already validated'}), 400
    
    # Get delivery items
    cursor.execute('''
        SELECT di.*, p.name as product_name, p.current_stock
        FROM delivery_items di
        JOIN products p ON di.product_id = p.id
        WHERE di.delivery_id = ?
    ''', (id,))
    items = cursor.fetchall()
    
    # 🔥 CHECK STOCK AVAILABILITY FIRST
    for item in items:
        if item['current_stock'] < item['quantity']:
            return jsonify({
                'error': f'Insufficient stock for {item["product_name"]}. Available: {item["current_stock"]}, Required: {item["quantity"]}'
            }), 400
    
    # 🔥 STOCK LOGIC: Decrease stock for each product
    for item in items:
        product_id = item['product_id']
        quantity = item['quantity']
        
        # Update product stock
        cursor.execute('''
            UPDATE products 
            SET current_stock = current_stock - ? 
            WHERE id = ?
        ''', (quantity, product_id))
        
        # Create stock movement record
        cursor.execute('''
            INSERT INTO stock_movements 
            (product_id, movement_type, quantity, reference)
            VALUES (?, 'DELIVERY', ?, ?)
        ''', (product_id, quantity, delivery['order_number']))
        
        print(f"✅ Decreased stock for product {product_id} ({item['product_name']}) by {quantity}")
    
    # Update delivery status
    cursor.execute('''
        UPDATE delivery_orders 
        SET status = 'VALIDATED' 
        WHERE id = ?
    ''', (id,))
    
    db.conn.commit()
    
    return jsonify({
        'message': 'Delivery validated successfully',
        'order_number': delivery['order_number'],
        'items_processed': len(items)
    }), 200
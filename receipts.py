from flask import Blueprint, request, jsonify
from models import db
from datetime import datetime

receipts_bp = Blueprint('receipts', __name__, url_prefix='/api/receipts')

@receipts_bp.route('', methods=['GET'])
def get_receipts():
    """Get all receipts with items"""
    cursor = db.conn.cursor()
    
    # Get all receipts
    cursor.execute('''
        SELECT * FROM receipts 
        ORDER BY created_at DESC
    ''')
    receipts = cursor.fetchall()
    
    result = []
    for receipt in receipts:
        # Get items for this receipt
        cursor.execute('''
            SELECT ri.*, p.name as product_name, p.sku
            FROM receipt_items ri
            JOIN products p ON ri.product_id = p.id
            WHERE ri.receipt_id = ?
        ''', (receipt['id'],))
        items = cursor.fetchall()
        
        receipt_dict = dict(receipt)
        receipt_dict['items'] = [dict(item) for item in items]
        result.append(receipt_dict)
    
    return jsonify(result), 200

@receipts_bp.route('', methods=['POST'])
def create_receipt():
    """Create new receipt (DRAFT status)"""
    data = request.json
    
    supplier_name = data.get('supplier_name')
    items = data.get('items', [])  # [{product_id: 1, quantity: 50}, ...]
    
    if not supplier_name:
        return jsonify({'error': 'Supplier name required'}), 400
    
    if not items or len(items) == 0:
        return jsonify({'error': 'At least one product required'}), 400
    
    cursor = db.conn.cursor()
    
    # Generate receipt number
    receipt_number = f"REC-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # Create receipt
    cursor.execute('''
        INSERT INTO receipts (receipt_number, supplier_name, status)
        VALUES (?, ?, 'DRAFT')
    ''', (receipt_number, supplier_name))
    
    receipt_id = cursor.lastrowid
    
    # Add items
    for item in items:
        product_id = item.get('product_id')
        quantity = item.get('quantity', 0)
        
        if not product_id or quantity <= 0:
            continue
        
        cursor.execute('''
            INSERT INTO receipt_items (receipt_id, product_id, quantity)
            VALUES (?, ?, ?)
        ''', (receipt_id, product_id, quantity))
    
    db.conn.commit()
    
    # Return created receipt with items
    cursor.execute('SELECT * FROM receipts WHERE id = ?', (receipt_id,))
    receipt = cursor.fetchone()
    
    cursor.execute('''
        SELECT ri.*, p.name as product_name, p.sku
        FROM receipt_items ri
        JOIN products p ON ri.product_id = p.id
        WHERE ri.receipt_id = ?
    ''', (receipt_id,))
    items = cursor.fetchall()
    
    receipt_dict = dict(receipt)
    receipt_dict['items'] = [dict(item) for item in items]
    
    return jsonify(receipt_dict), 201

@receipts_bp.route('/<int:id>/validate', methods=['POST'])
def validate_receipt(id):
    """
    🔥 CRITICAL FUNCTION: Validate receipt and INCREASE stock
    This is the core inventory logic!
    """
    cursor = db.conn.cursor()
    
    # Get receipt
    cursor.execute('SELECT * FROM receipts WHERE id = ?', (id,))
    receipt = cursor.fetchone()
    
    if not receipt:
        return jsonify({'error': 'Receipt not found'}), 404
    
    if receipt['status'] == 'VALIDATED':
        return jsonify({'error': 'Receipt already validated'}), 400
    
    # Get receipt items
    cursor.execute('''
        SELECT ri.*, p.name as product_name
        FROM receipt_items ri
        JOIN products p ON ri.product_id = p.id
        WHERE ri.receipt_id = ?
    ''', (id,))
    items = cursor.fetchall()
    
    # 🔥 STOCK LOGIC: Increase stock for each product
    for item in items:
        product_id = item['product_id']
        quantity = item['quantity']
        
        # Update product stock
        cursor.execute('''
            UPDATE products 
            SET current_stock = current_stock + ? 
            WHERE id = ?
        ''', (quantity, product_id))
        
        # Create stock movement record (for audit trail)
        cursor.execute('''
            INSERT INTO stock_movements 
            (product_id, movement_type, quantity, reference)
            VALUES (?, 'RECEIPT', ?, ?)
        ''', (product_id, quantity, receipt['receipt_number']))
        
        print(f"✅ Increased stock for product {product_id} ({item['product_name']}) by {quantity}")
    
    # Update receipt status
    cursor.execute('''
        UPDATE receipts 
        SET status = 'VALIDATED' 
        WHERE id = ?
    ''', (id,))
    
    db.conn.commit()
    
    return jsonify({
        'message': 'Receipt validated successfully',
        'receipt_number': receipt['receipt_number'],
        'items_processed': len(items)
    }), 200

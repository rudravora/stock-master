from flask import Blueprint, request, jsonify
from models import db
from datetime import datetime

transfers_bp = Blueprint('transfers', __name__, url_prefix='/api/transfers')

@transfers_bp.route('', methods=['GET'])
def get_transfers():
    """Get all internal transfers"""
    cursor = db.conn.cursor()
    cursor.execute('''
        SELECT * FROM internal_transfers 
        ORDER BY created_at DESC
    ''')
    transfers = cursor.fetchall()
    return jsonify([dict(t) for t in transfers]), 200

@transfers_bp.route('', methods=['POST'])
def create_transfer():
    """Create internal transfer"""
    data = request.json
    
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    from_location = data.get('from_location')
    to_location = data.get('to_location')
    
    if not all([product_id, quantity, from_location, to_location]):
        return jsonify({'error': 'All fields required'}), 400
    
    cursor = db.conn.cursor()
    transfer_number = f"TRF-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    cursor.execute('''
        INSERT INTO internal_transfers 
        (transfer_number, product_id, quantity, from_location, to_location, status)
        VALUES (?, ?, ?, ?, ?, 'DRAFT')
    ''', (transfer_number, product_id, quantity, from_location, to_location))
    
    db.conn.commit()
    transfer_id = cursor.lastrowid
    
    cursor.execute('SELECT * FROM internal_transfers WHERE id = ?', (transfer_id,))
    transfer = cursor.fetchone()
    
    return jsonify(dict(transfer)), 201

@transfers_bp.route('/<int:id>/validate', methods=['POST'])
def validate_transfer(id):
    """Validate internal transfer"""
    cursor = db.conn.cursor()
    
    cursor.execute('SELECT * FROM internal_transfers WHERE id = ?', (id,))
    transfer = cursor.fetchone()
    
    if not transfer:
        return jsonify({'error': 'Transfer not found'}), 404
    
    if transfer['status'] == 'VALIDATED':
        return jsonify({'error': 'Transfer already validated'}), 400
    
    # Log stock movement
    cursor.execute('''
        INSERT INTO stock_movements 
        (product_id, movement_type, quantity, reference)
        VALUES (?, 'TRANSFER', ?, ?)
    ''', (transfer['product_id'], transfer['quantity'], transfer['transfer_number']))
    
    cursor.execute('''
        UPDATE internal_transfers 
        SET status = 'VALIDATED' 
        WHERE id = ?
    ''', (id,))
    
    db.conn.commit()
    
    return jsonify({'message': 'Transfer validated successfully'}), 200
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db
import jwt
from functools import wraps
import os

profile_bp = Blueprint('profile', __name__, url_prefix='/api/profile')
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'stockmaster-secret-2025')

def token_required(f):
    """Decorator to require JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token missing'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user_id = data['user_id']
            
            cursor = db.conn.cursor()
            cursor.execute('SELECT * FROM users WHERE id = ?', (current_user_id,))
            current_user = cursor.fetchone()
            
            if not current_user:
                return jsonify({'error': 'Invalid token'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

@profile_bp.route('', methods=['GET'])
@token_required
def get_profile(current_user):
    """Get current user profile"""
    return jsonify({
        'id': current_user['id'],
        'name': current_user['name'],
        'email': current_user['email'],
        'created_at': current_user['created_at']
    }), 200

@profile_bp.route('', methods=['PUT'])
@token_required
def update_profile(current_user):
    """Update user profile"""
    data = request.json
    
    name = data.get('name')
    
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    
    cursor = db.conn.cursor()
    cursor.execute('''
        UPDATE users 
        SET name = ? 
        WHERE id = ?
    ''', (name, current_user['id']))
    
    db.conn.commit()
    
    cursor.execute('SELECT * FROM users WHERE id = ?', (current_user['id'],))
    updated_user = cursor.fetchone()
    
    return jsonify({
        'id': updated_user['id'],
        'name': updated_user['name'],
        'email': updated_user['email'],
        'created_at': updated_user['created_at']
    }), 200

@profile_bp.route('/change-password', methods=['POST'])
@token_required
def change_password(current_user):
    """Change user password"""
    data = request.json
    
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    
    if not all([current_password, new_password]):
        return jsonify({'error': 'Current and new password are required'}), 400
    
    if len(new_password) < 8:
        return jsonify({'error': 'New password must be at least 8 characters'}), 400
    
    # Verify current password
    if not check_password_hash(current_user['password_hash'], current_password):
        return jsonify({'error': 'Current password is incorrect'}), 401
    
    # Update password
    new_password_hash = generate_password_hash(new_password)
    
    cursor = db.conn.cursor()
    cursor.execute('''
        UPDATE users 
        SET password_hash = ? 
        WHERE id = ?
    ''', (new_password_hash, current_user['id']))
    
    db.conn.commit()
    
    return jsonify({'message': 'Password changed successfully'}), 200
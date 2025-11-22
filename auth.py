from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'stockmaster-secret-2025')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        if not all([name, email, password]):
            return jsonify({'error': 'All fields required'}), 400
        
        cursor = db.conn.cursor()
        try:
            cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
            if cursor.fetchone():
                return jsonify({'error': 'Email already exists'}), 400
            
            password_hash = generate_password_hash(password)
            cursor.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                (name, email, password_hash)
            )
            db.conn.commit()
            
            return jsonify({'message': 'User registered successfully'}), 201
        finally:
            cursor.close()
            
    except Exception as e:
        db.conn.rollback()
        return jsonify({'error': 'Registration failed'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({'error': 'Email and password required'}), 400
        
        cursor = db.conn.cursor()
        try:
            cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
            user = cursor.fetchone()
            
            if not user or not check_password_hash(user['password_hash'], password):
                return jsonify({'error': 'Invalid credentials'}), 401
            
            token = jwt.encode({
                'user_id': user['id'],
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
            }, SECRET_KEY, algorithm='HS256')
            
            return jsonify({
                'token': token,
                'user': {
                    'id': user['id'],
                    'name': user['name'],
                    'email': user['email']
                }
            }), 200
        finally:
            cursor.close()
            
    except Exception as e:
        return jsonify({'error': 'Login failed'}), 500


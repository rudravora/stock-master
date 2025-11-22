from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models import db
import random
import string
import datetime

password_reset_bp = Blueprint('password_reset', __name__, url_prefix='/api/password-reset')

# In-memory OTP storage (use Redis in production)
otp_storage = {}

def generate_otp():
    """Generate 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

def send_otp_email(email, otp):
    """
    Send OTP via email
    NOTE: Implement actual email service (SMTP, SendGrid, etc.)
    For now, just print to console
    """
    print(f"📧 OTP for {email}: {otp}")
    # TODO: Integrate with email service
    # import smtplib
    # Send actual email here

@password_reset_bp.route('/request-otp', methods=['POST'])
def request_otp():
    """Request OTP for password reset"""
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    
    if not user:
        # Don't reveal if email exists (security best practice)
        return jsonify({'message': 'If email exists, OTP has been sent'}), 200
    
    # Generate OTP
    otp = generate_otp()
    expiry = datetime.datetime.now() + datetime.timedelta(minutes=10)
    
    # Store OTP
    otp_storage[email] = {
        'otp': otp,
        'expiry': expiry,
        'attempts': 0
    }
    
    # Send OTP via email
    send_otp_email(email, otp)
    
    return jsonify({'message': 'OTP sent to your email'}), 200

@password_reset_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP"""
    data = request.json
    email = data.get('email')
    otp = data.get('otp')
    
    if not all([email, otp]):
        return jsonify({'error': 'Email and OTP are required'}), 400
    
    # Check if OTP exists
    if email not in otp_storage:
        return jsonify({'error': 'No OTP request found for this email'}), 400
    
    stored_data = otp_storage[email]
    
    # Check expiry
    if datetime.datetime.now() > stored_data['expiry']:
        del otp_storage[email]
        return jsonify({'error': 'OTP expired. Please request a new one'}), 400
    
    # Check attempts
    if stored_data['attempts'] >= 3:
        del otp_storage[email]
        return jsonify({'error': 'Too many failed attempts. Please request a new OTP'}), 400
    
    # Verify OTP
    if stored_data['otp'] != otp:
        stored_data['attempts'] += 1
        return jsonify({'error': 'Invalid OTP'}), 400
    
    # OTP verified successfully
    # Generate temporary token for password reset
    import jwt
    reset_token = jwt.encode({
        'email': email,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
    }, 'stockmaster-secret-2025', algorithm='HS256')
    
    # Clean up OTP
    del otp_storage[email]
    
    return jsonify({
        'message': 'OTP verified successfully',
        'reset_token': reset_token
    }), 200

@password_reset_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """Reset password using verified token"""
    data = request.json
    reset_token = data.get('reset_token')
    new_password = data.get('new_password')
    
    if not all([reset_token, new_password]):
        return jsonify({'error': 'Reset token and new password are required'}), 400
    
    if len(new_password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters'}), 400
    
    try:
        import jwt
        payload = jwt.decode(reset_token, 'stockmaster-secret-2025', algorithms=['HS256'])
        email = payload['email']
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Reset token expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid reset token'}), 400
    
    cursor = db.conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update password
    password_hash = generate_password_hash(new_password)
    cursor.execute('''
        UPDATE users 
        SET password_hash = ? 
        WHERE email = ?
    ''', (password_hash, email))
    
    db.conn.commit()
    
    return jsonify({'message': 'Password reset successfully'}), 200
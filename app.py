from flask import Flask
from flask_cors import CORS
from models import db
from auth import auth_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'stockmaster-secret-2025'
CORS(app)

# Register Authentication Blueprint
app.register_blueprint(auth_bp)

@app.route('/api/health', methods=['GET'])
def health():
    return {'status': 'ok', 'message': 'StockMaster API running'}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)



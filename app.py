from flask import Flask
from flask_cors import CORS
from models import db
from auth import auth_bp
from products import products_bp
from dashboard import dashboard_bp
from receipts import receipts_bp
from deliveries import deliveries_bp
from stock_movements import stock_movements_bp
from warehouses import warehouses_bp
from categories import categories_bp
from password_reset import password_reset_bp
from alerts import alerts_bp
from profile import profile_bp
from filters import filters_bp
from transfers import transfers_bp
from adjustments import adjustments_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'stockmaster-secret-2025'
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(products_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(receipts_bp)
app.register_blueprint(deliveries_bp)
app.register_blueprint(stock_movements_bp)
app.register_blueprint(warehouses_bp)
app.register_blueprint(categories_bp)
app.register_blueprint(password_reset_bp)
app.register_blueprint(alerts_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(filters_bp)
app.register_blueprint(transfers_bp)
app.register_blueprint(adjustments_bp)

@app.route('/api/health', methods=['GET'])
def health():
    return {'status': 'ok', 'message': 'StockMaster API running'}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

from config.database import db
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.analytics_routes import analytics_bp

load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "hiring_assistant_secret_key")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "hiring_assistant_jwt_secret_key")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["FRONTEND_RESET_URL"] = os.getenv(
    "FRONTEND_RESET_URL",
    "https://hiringassistant.vercel.app"
)

CORS(
    app,
    resources={r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://hiringassistant.vercel.app",
            "https://hiringassistant-822ix0hy0-elamathyramanan15s-projects.vercel.app"
        ]
    }},
    supports_credentials=True
)

JWTManager(app)
db.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
app.register_blueprint(analytics_bp, url_prefix="/api/analytics")


@app.route("/", methods=["GET"])
def home():
    return {
        "success": True,
        "message": "AI-Powered Resume Screening and Hiring Assistant Backend Running"
    }


@app.route("/api/test-db", methods=["GET"])
def test_db():
    try:
        db.session.execute(db.text("SELECT 1"))

        return {
            "success": True,
            "message": "PostgreSQL database connected successfully"
        }, 200

    except Exception as e:
        return {
            "success": False,
            "message": "Database connection failed",
            "error": str(e)
        }, 500


@app.route("/api/show-tables", methods=["GET"])
def show_tables():
    try:
        result = db.session.execute(db.text("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        """))

        tables = [row[0] for row in result]

        return {
            "success": True,
            "tables": tables
        }, 200

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }, 500


@app.route("/api/table-columns/<table_name>", methods=["GET"])
def table_columns(table_name):
    try:
        result = db.session.execute(db.text("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = :table_name
            ORDER BY ordinal_position
        """), {"table_name": table_name})

        columns = [
            {
                "column_name": row[0],
                "data_type": row[1],
                "is_nullable": row[2]
            }
            for row in result
        ]

        return {
            "success": True,
            "table": table_name,
            "columns": columns
        }, 200

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }, 500


if __name__ == "__main__":
    app.run(debug=True)
from datetime import datetime
from config.database import db


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.String(36), primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(100), nullable=True)
    account_status = db.Column(db.String(50), nullable=True)
    failed_attempt_count = db.Column(db.Integer, nullable=True)
    last_failed_attempt = db.Column(db.DateTime, nullable=True)
    lock_until = db.Column(db.DateTime, nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "role": self.role,
            "department": self.department,
            "account_status": self.account_status,
            "last_login": self.last_login.isoformat() if self.last_login else None
        }
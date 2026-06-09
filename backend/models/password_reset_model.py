import uuid
from datetime import datetime
from config.database import db


class PasswordReset(db.Model):
    __tablename__ = "password_resets"

    reset_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("users.user_id"), nullable=False)
    reset_token = db.Column(db.String(255), nullable=False)
    expiry_time = db.Column(db.DateTime, nullable=False)
    used_status = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
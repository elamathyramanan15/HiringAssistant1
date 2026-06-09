import bcrypt
import secrets
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token
from flask import current_app

from config.database import db
from models.user_model import User
from models.password_reset_model import PasswordReset
from services.email_service import send_reset_password_email


def check_password(password, stored_password):
    try:
        if stored_password.startswith("$2a$") or stored_password.startswith("$2b$") or stored_password.startswith("$2y$"):
            return bcrypt.checkpw(password.encode("utf-8"), stored_password.encode("utf-8"))

        return password == stored_password

    except Exception:
        return False


def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def login_user(data):
    email = data.get("email")
    password = data.get("password")
    selected_role = data.get("role")

    max_attempts = 5
    lock_duration_seconds = 60

    if not email or not password:
        return None, "Email and password are required"

    user = User.query.filter_by(email=email).first()

    if not user:
        return None, "Invalid email or password"

    now = datetime.utcnow()

    if user.lock_until and user.lock_until > now:
        remaining_seconds = int((user.lock_until - now).total_seconds())

        return None, {
            "message": "Account is temporarily locked. Please try again later.",
            "status_code": 423,
            "data": {
                "account_locked": True,
                "lock_until": user.lock_until.isoformat(),
                "remaining_seconds": remaining_seconds,
                "failed_attempt_count": user.failed_attempt_count or 0,
                "remaining_attempts": 0
            }
        }

    if user.lock_until and user.lock_until <= now:
        user.failed_attempt_count = 0
        user.lock_until = None
        db.session.commit()

    if selected_role and user.role.lower() != selected_role.lower():
        return None, f"This account is not registered as {selected_role}"

    if user.account_status and user.account_status.lower() != "active":
        return None, "Account is not active. Please contact admin."

    if not check_password(password, user.password_hash):
        user.failed_attempt_count = (user.failed_attempt_count or 0) + 1
        user.last_failed_attempt = now

        remaining_attempts = max_attempts - user.failed_attempt_count

        if user.failed_attempt_count >= max_attempts:
            user.lock_until = now + timedelta(seconds=lock_duration_seconds)
            db.session.commit()

            return None, {
                "message": "Too many failed login attempts. Account locked temporarily.",
                "status_code": 423,
                "data": {
                    "account_locked": True,
                    "lock_until": user.lock_until.isoformat(),
                    "remaining_seconds": lock_duration_seconds,
                    "failed_attempt_count": user.failed_attempt_count,
                    "remaining_attempts": 0
                }
            }

        db.session.commit()

        return None, {
            "message": "Invalid email or password",
            "status_code": 401,
            "data": {
                "account_locked": False,
                "failed_attempt_count": user.failed_attempt_count,
                "remaining_attempts": remaining_attempts
            }
        }

    user.failed_attempt_count = 0
    user.lock_until = None
    user.last_failed_attempt = None
    user.last_login = now
    db.session.commit()

    access_token = create_access_token(
        identity=str(user.user_id),
        additional_claims={
            "role": user.role,
            "email": user.email
        }
    )

    return {
        "access_token": access_token,
        "user": user.to_dict()
    }, "Login successful"


def forgot_password(data):
    email = data.get("email")

    if not email:
        return None, "Email is required"

    user = User.query.filter_by(email=email).first()

    if not user:
        return None, "No account found with this email"

    token = secrets.token_urlsafe(32)

    reset_record = PasswordReset(
        user_id=str(user.user_id),
        reset_token=token,
        expiry_time=datetime.utcnow() + timedelta(minutes=30),
        used_status=False
    )

    db.session.add(reset_record)
    db.session.commit()

    frontend_reset_url = current_app.config.get("FRONTEND_RESET_URL") or "http://localhost:3000"
    reset_link = f"{frontend_reset_url}/?token={token}"

    send_reset_password_email(user.email, reset_link)

    return {
        "email": user.email
    }, "Password reset link sent successfully"


def reset_password(data):
    token = data.get("token")
    new_password = data.get("new_password")
    confirm_password = data.get("confirm_password")

    if not token or not new_password or not confirm_password:
        return None, "Token, new password, and confirm password are required"

    if new_password != confirm_password:
        return None, "Passwords do not match"

    reset_record = PasswordReset.query.filter_by(
        reset_token=token,
        used_status=False
    ).first()

    if not reset_record:
        return None, "Invalid or already used reset token"

    if reset_record.expiry_time < datetime.utcnow():
        return None, "Reset token has expired"

    user = User.query.filter_by(user_id=str(reset_record.user_id)).first()

    if not user:
        return None, "User not found"

    user.password_hash = hash_password(new_password)
    user.updated_at = datetime.utcnow()
    reset_record.used_status = True

    db.session.commit()

    return True, "Password updated successfully"
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from services.auth_service import login_user, forgot_password, reset_password
from models.user_model import User
from utils.response_handler import success_response, error_response

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return error_response("Request body is required", 400)

    result, message = login_user(data)

    if not result:
        error_data = None
        status_code = 401

        if isinstance(message, dict):
            error_data = message.get("data")
            status_code = message.get("status_code", 401)
            message = message.get("message")

        return error_response(message, status_code, error_data)

    return success_response(message, result, 200)


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password_route():
    data = request.get_json()

    if not data:
        return error_response("Request body is required", 400)

    result, message = forgot_password(data)

    if not result:
        return error_response(message, 404)

    return success_response(message, result, 200)


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password_route():
    data = request.get_json()

    if not data:
        return error_response("Request body is required", 400)

    result, message = reset_password(data)

    if not result:
        return error_response(message, 400)

    return success_response(message, None, 200)


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    claims = get_jwt()

    user = User.query.filter_by(user_id=user_id).first()

    if not user:
        return error_response("User not found", 404)

    return success_response("Current user fetched successfully", {
        "user": user.to_dict(),
        "role": claims.get("role")
    }, 200)


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return success_response("Logout successful. Please remove token from frontend.", None, 200)
from flask import Blueprint
from services.dashboard_service import (
    get_admin_dashboard_data,
    get_all_recruiters,
    create_recruiter,
    update_recruiter_status,
    delete_recruiter
)
from utils.response_handler import success_response, error_response

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/admin", methods=["GET"])
def admin_dashboard():
    try:
        data = get_admin_dashboard_data()
        return success_response("Admin dashboard data fetched successfully", data, 200)
    except Exception as e:
        print("ADMIN DASHBOARD ERROR:", str(e))
        return {
            "success": False,
            "message": "Failed to load admin dashboard",
            "error": str(e)
        }, 500
    
@dashboard_bp.route("/recruiters", methods=["GET"])
def recruiters_list():
    try:
        data = get_all_recruiters()
        return success_response("Recruiters fetched successfully", data, 200)
    except Exception as e:
        return error_response(str(e), 500)


@dashboard_bp.route("/recruiters", methods=["POST"])
def recruiter_create():
    try:
        from flask import request

        data = request.get_json()

        if not data:
            return error_response("Request body is required", 400)

        result, message = create_recruiter(data)

        if not result:
            return error_response(message, 400)

        return success_response(message, result, 201)

    except Exception as e:
        return error_response(str(e), 500)


@dashboard_bp.route("/recruiters/<user_id>/status", methods=["POST"])
def recruiter_status_update(user_id):
    try:
        from flask import request

        data = request.get_json()

        if not data or not data.get("status"):
            return error_response("Status is required", 400)

        result, message = update_recruiter_status(user_id, data.get("status"))

        if not result:
            return error_response(message, 404)

        return success_response(message, result, 200)

    except Exception as e:
        return error_response(str(e), 500)


@dashboard_bp.route("/recruiters/<user_id>", methods=["DELETE"])
def recruiter_delete(user_id):
    try:
        result, message = delete_recruiter(user_id)

        if not result:
            return error_response(message, 404)

        return success_response(message, None, 200)

    except Exception as e:
        return error_response(str(e), 500)    
from flask import Blueprint
from services.dashboard_service import get_admin_dashboard_data
from utils.response_handler import success_response, error_response

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/admin", methods=["GET"])
def admin_dashboard():
    try:
        data = get_admin_dashboard_data()
        return success_response("Admin dashboard data fetched successfully", data, 200)
    except Exception as e:
        return error_response(str(e), 500)
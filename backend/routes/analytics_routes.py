from flask import Blueprint
from services.analytics_service import get_platform_analytics_data
from utils.response_handler import success_response, error_response

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/platform", methods=["GET"])
def platform_analytics():
    try:
        data = get_platform_analytics_data()
        return success_response("Platform analytics data fetched successfully", data, 200)
    except Exception as e:
        return error_response(str(e), 500)
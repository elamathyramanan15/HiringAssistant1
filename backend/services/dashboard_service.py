from config.database import db
from models.user_model import User
from werkzeug.security import generate_password_hash
from datetime import datetime
import uuid
from services.email_service import send_recruiter_credentials_email


def get_admin_dashboard_data():
    total_recruiters = db.session.execute(db.text("""
        SELECT COUNT(*) FROM users WHERE LOWER(role) = 'recruiter'
    """)).scalar() or 0

    total_candidates = db.session.execute(db.text("""
        SELECT COUNT(*) FROM candidates
    """)).scalar() or 0

    active_jobs = db.session.execute(db.text("""
        SELECT COUNT(*) FROM job_descriptions WHERE LOWER(status) = 'active'
    """)).scalar() or 0

    interviews_scheduled = db.session.execute(db.text("""
        SELECT COUNT(*) FROM interviews
    """)).scalar() or 0

    candidate_status = db.session.execute(db.text("""
        SELECT status, COUNT(*) 
        FROM applications
        GROUP BY status
    """)).fetchall()

    status_data = [
        {"name": row[0], "value": row[1]}
        for row in candidate_status
    ]

    pipeline_data = db.session.execute(db.text("""
        SELECT 
            TO_CHAR(applied_date, 'Mon') AS month,
            COUNT(*) AS candidates,
            SUM(CASE WHEN LOWER(status) IN ('selected', 'hired') THEN 1 ELSE 0 END) AS hired
        FROM applications
        WHERE applied_date IS NOT NULL
        GROUP BY TO_CHAR(applied_date, 'Mon'), EXTRACT(MONTH FROM applied_date)
        ORDER BY EXTRACT(MONTH FROM applied_date)
    """)).fetchall()

    pipeline = [
        {
            "month": row[0],
            "Candidates": row[1],
            "Hired": row[2] or 0
        }
        for row in pipeline_data
    ]

    recruiters = db.session.execute(db.text("""
        SELECT 
            u.user_id,
            u.first_name,
            u.last_name,
            u.email,
            u.department,
            u.account_status,
            COUNT(DISTINCT jd.jd_id) AS active_jobs,
            COUNT(DISTINCT a.candidate_id) AS candidates_processed
        FROM users u
        LEFT JOIN job_descriptions jd 
            ON u.user_id = jd.recruiter_id
        LEFT JOIN applications a 
            ON jd.jd_id = a.jd_id
        WHERE LOWER(u.role) = 'recruiter'
        GROUP BY u.user_id, u.first_name, u.last_name, u.email, u.department, u.account_status
        ORDER BY u.first_name
        LIMIT 10
    """)).fetchall()

    recruiter_activity = [
        {
            "user_id": str(row[0]),
            "name": f"{row[1]} {row[2] or ''}".strip(),
            "email": row[3],
            "dept": row[4] or "Not Assigned",
            "status": row[5] or "Active",
            "jobs": row[6] or 0,
            "candidates": row[7] or 0
        }
        for row in recruiters
    ]

    return {
        "stats": {
            "total_recruiters": total_recruiters,
            "total_candidates": total_candidates,
            "active_jobs": active_jobs,
            "interviews_scheduled": interviews_scheduled
        },
        "candidate_status": status_data,
        "pipeline": pipeline,
        "recruiters": recruiter_activity
    }


def format_recruiter(user):
    name = f"{user.first_name} {user.last_name or ''}".strip()
    initials = "".join([part[0] for part in name.split()]).upper()[:2]

    return {
        "user_id": user.user_id,
        "initials": initials,
        "name": name,
        "email": user.email,
        "dept": user.department or "Not Assigned",
        "jobs": 0,
        "candidates": 0,
        "status": user.account_status or "Active",
        "bg": "bg-violet-600"
    }


def get_all_recruiters():
    recruiters = db.session.execute(db.text("""
        SELECT 
            u.user_id,
            u.first_name,
            u.last_name,
            u.email,
            u.department,
            u.account_status,
            COUNT(DISTINCT jd.jd_id) AS active_jobs,
            COUNT(DISTINCT a.candidate_id) AS candidates_processed
        FROM users u
        LEFT JOIN job_descriptions jd 
            ON u.user_id = jd.recruiter_id
        LEFT JOIN applications a 
            ON jd.jd_id = a.jd_id
        WHERE LOWER(u.role) = 'recruiter'
        GROUP BY u.user_id, u.first_name, u.last_name, u.email, u.department, u.account_status
        ORDER BY u.created_at DESC
    """)).fetchall()

    recruiter_list = [
        {
            "user_id": str(row[0]),
            "initials": "".join([
                part[0]
                for part in f"{row[1]} {row[2] or ''}".strip().split()
            ]).upper()[:2],
            "name": f"{row[1]} {row[2] or ''}".strip(),
            "email": row[3],
            "dept": row[4] or "Not Assigned",
            "status": row[5] or "ACTIVE",
            "jobs": row[6] or 0,
            "candidates": row[7] or 0,
            "bg": "bg-violet-600"
        }
        for row in recruiters
    ]

    return recruiter_list


def create_recruiter(data):
    existing_user = User.query.filter_by(email=data.get("email")).first()

    if existing_user:
        return None, "Email already exists"

    plain_password = data.get("password")

    recruiter = User(
        user_id=str(uuid.uuid4()),
        first_name=data.get("firstName"),
        last_name=data.get("lastName"),
        email=data.get("email"),
        phone_number=data.get("phone"),
        role="RECRUITER",
        department=data.get("department"),
        password_hash=generate_password_hash(plain_password),
        account_status="ACTIVE",
        failed_attempt_count=0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(recruiter)
    db.session.commit()

    if data.get("sendCredentials") is True:
        recruiter_name = f"{recruiter.first_name} {recruiter.last_name or ''}".strip()

        send_recruiter_credentials_email(
            to_email=recruiter.email,
            recruiter_name=recruiter_name,
            login_email=recruiter.email,
            temporary_password=plain_password
        )

    return format_recruiter(recruiter), "Recruiter created successfully"


def update_recruiter_status(user_id, status):
    recruiter = User.query.filter(
        User.user_id == user_id,
        db.func.lower(User.role) == "recruiter"
    ).first()

    if not recruiter:
        return None, "Recruiter not found"

    recruiter.account_status = status.upper()
    recruiter.updated_at = datetime.utcnow()

    db.session.commit()

    return format_recruiter(recruiter), "Recruiter status updated successfully"


def delete_recruiter(user_id):
    recruiter = User.query.filter_by(
        user_id=user_id,
        role="RECRUITER"
    ).first()

    if not recruiter:
        return False, "Recruiter not found"

    db.session.delete(recruiter)
    db.session.commit()

    return True, "Recruiter deleted successfully"
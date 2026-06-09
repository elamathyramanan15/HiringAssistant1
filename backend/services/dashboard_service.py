from config.database import db


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
        GROUP BY u.user_id, u.first_name, u.last_name, u.department, u.account_status
        ORDER BY u.first_name
        LIMIT 10
    """)).fetchall()

    recruiter_activity = [
        {
            "user_id": str(row[0]),
            "name": f"{row[1]} {row[2] or ''}".strip(),
            "dept": row[3] or "Not Assigned",
            "status": row[4] or "ACTIVE",
            "jobs": row[5] or 0,
            "candidates": row[6] or 0
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
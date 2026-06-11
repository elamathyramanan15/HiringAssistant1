from config.database import db


def get_platform_analytics_data():
    total_candidates = db.session.execute(db.text("""
        SELECT COUNT(*) FROM candidates
    """)).scalar() or 0

    total_applications = db.session.execute(db.text("""
        SELECT COUNT(*) FROM applications
    """)).scalar() or 0

    total_recruiters = db.session.execute(db.text("""
        SELECT COUNT(*) FROM users WHERE LOWER(role) = 'recruiter'
    """)).scalar() or 0

    active_jobs = db.session.execute(db.text("""
        SELECT COUNT(*) FROM job_descriptions WHERE LOWER(status) = 'active'
    """)).scalar() or 0

    selected_count = db.session.execute(db.text("""
        SELECT COUNT(*) FROM applications WHERE LOWER(status) IN ('selected', 'hired')
    """)).scalar() or 0

    rejected_count = db.session.execute(db.text("""
        SELECT COUNT(*) FROM applications WHERE LOWER(status) = 'rejected'
    """)).scalar() or 0

    selection_rate = round((selected_count / total_applications) * 100, 2) if total_applications else 0

    kpis = [
        {"label": "Total Candidates", "value": total_candidates, "sub": "Candidate records"},
        {"label": "Applications", "value": total_applications, "sub": "Total applications"},
        {"label": "Recruiters", "value": total_recruiters, "sub": "Active platform users"},
        {"label": "Active Jobs", "value": active_jobs, "sub": "Open job descriptions"},
        {"label": "Selection Rate", "value": f"{selection_rate}%", "sub": "Selected applications"},
    ]

    pipeline_rows = db.session.execute(db.text("""
        SELECT status, COUNT(*)
        FROM applications
        GROUP BY status
        ORDER BY COUNT(*) DESC
    """)).fetchall()

    pipeline = [
        {"stage": row[0], "count": row[1]}
        for row in pipeline_rows
    ]

    app_status_total = sum(row[1] for row in pipeline_rows) or 1
    colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#38bdf8"]

    application_status = [
        {
            "name": row[0],
            "value": round((row[1] / app_status_total) * 100, 2),
            "color": colors[index % len(colors)]
        }
        for index, row in enumerate(pipeline_rows)
    ]

    hiring_trend_rows = db.session.execute(db.text("""
        SELECT 
            TO_CHAR(applied_date, 'Mon') AS month,
            COUNT(*) AS applications,
            SUM(CASE WHEN LOWER(status) IN ('selected', 'hired') THEN 1 ELSE 0 END) AS selections,
            EXTRACT(MONTH FROM applied_date) AS month_num
        FROM applications
        WHERE applied_date IS NOT NULL
        GROUP BY TO_CHAR(applied_date, 'Mon'), EXTRACT(MONTH FROM applied_date)
        ORDER BY EXTRACT(MONTH FROM applied_date)
    """)).fetchall()

    hiring_trend = [
        {
            "month": row[0],
            "Applications": row[1],
            "Selections": row[2] or 0
        }
        for row in hiring_trend_rows
    ]

    selection_rejection = [
        {
            "month": row[0],
            "Selected": row[2] or 0,
            "Rejected": db.session.execute(db.text("""
                SELECT COUNT(*)
                FROM applications
                WHERE TO_CHAR(applied_date, 'Mon') = :month
                AND LOWER(status) = 'rejected'
            """), {"month": row[0]}).scalar() or 0
        }
        for row in hiring_trend_rows
    ]

    recruiter_perf_rows = db.session.execute(db.text("""
        SELECT 
            u.first_name,
            u.last_name,
            COUNT(a.application_id) AS processed
        FROM users u
        LEFT JOIN job_descriptions jd ON u.user_id = jd.recruiter_id
        LEFT JOIN applications a ON jd.jd_id = a.jd_id
        WHERE LOWER(u.role) = 'recruiter'
        GROUP BY u.user_id, u.first_name, u.last_name
        ORDER BY processed DESC
        LIMIT 10
    """)).fetchall()

    recruiter_performance = [
        {
            "name": f"{row[0]} {row[1] or ''}".strip(),
            "count": row[2] or 0
        }
        for row in recruiter_perf_rows
    ]

    conversion_rate = []
    for row in recruiter_perf_rows:
        name = f"{row[0]} {row[1] or ''}".strip()

        selected = db.session.execute(db.text("""
            SELECT COUNT(*)
            FROM users u
            JOIN job_descriptions jd ON u.user_id = jd.recruiter_id
            JOIN applications a ON jd.jd_id = a.jd_id
            WHERE LOWER(u.role) = 'recruiter'
            AND u.first_name = :first_name
            AND LOWER(a.status) IN ('selected', 'hired')
        """), {"first_name": row[0]}).scalar() or 0

        total = row[2] or 0
        rate = round((selected / total) * 100, 2) if total else 0

        conversion_rate.append({
            "name": name,
            "rate": rate
        })

    jd_perf_rows = db.session.execute(db.text("""
        SELECT 
            jd.title,
            COUNT(a.application_id) AS count
        FROM job_descriptions jd
        LEFT JOIN applications a ON jd.jd_id = a.jd_id
        GROUP BY jd.jd_id, jd.title
        ORDER BY count DESC
        LIMIT 10
    """)).fetchall()

    jd_performance = [
        {"jd": row[0], "count": row[1] or 0}
        for row in jd_perf_rows
    ]

    candidate_rows = db.session.execute(db.text("""
        SELECT 
            c.candidate_id,
            c.full_name,
            u.first_name,
            u.last_name,
            jd.title,
            a.applied_date,
            a.status
        FROM applications a
        JOIN candidates c ON a.candidate_id = c.candidate_id
        JOIN job_descriptions jd ON a.jd_id = jd.jd_id
        JOIN users u ON jd.recruiter_id = u.user_id
        ORDER BY a.applied_date DESC NULLS LAST
        LIMIT 50
    """)).fetchall()

    status_color_map = {
        "selected": "bg-green-500",
        "hired": "bg-green-500",
        "shortlisted": "bg-blue-500",
        "under review": "bg-yellow-500",
        "rejected": "bg-red-500"
    }

    candidate_records = [
        {
            "id": index + 1,
            "name": row[1],
            "recruiter": f"{row[2]} {row[3] or ''}".strip(),
            "jd": row[4],
            "date": row[5].strftime("%Y-%m-%d") if row[5] else "N/A",
            "status": row[6],
            "statusColor": status_color_map.get(str(row[6]).lower(), "bg-gray-500"),
            "score": 0
        }
        for index, row in enumerate(candidate_rows)
    ]

    top_jd = jd_performance[0]["jd"] if jd_performance else "N/A"
    best_recruiter = recruiter_performance[0]["name"] if recruiter_performance else "N/A"

    insights = {
        "topSkill": {"value": "Pending ML Data", "sub": "Skill data not available yet"},
        "mostAppliedJd": {"value": top_jd, "sub": "Highest applications"},
        "bestRecruiter": {"value": best_recruiter, "sub": "Highest processed count"},
        "avgAiScore": {"value": "Pending ML Data", "sub": "AI score not available yet"},
        "bottleneck": {"value": "Under review", "sub": "Based on status count"}
    }

    return {
        "kpis": kpis,
        "pipeline": pipeline,
        "application_status": application_status,
        "hiring_trend": hiring_trend,
        "selection_rejection": selection_rejection,
        "skills": [],
        "recruiter_performance": recruiter_performance,
        "ai_score_distribution": [],
        "conversion_rate": conversion_rate,
        "jd_performance": jd_performance,
        "monthly_recruiters": recruiter_performance,
        "candidate_records": candidate_records,
        "insights": insights
    }
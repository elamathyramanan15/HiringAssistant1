from flask_mail import Message
from extensions import mail


def send_reset_password_email(to_email, reset_link):
    subject = "Reset Your HireAI Password"

    body = f"""
Hello,

We received a request to reset your HireAI account password.

Please click the link below to create a new password:

{reset_link}

This link will expire in 30 minutes.

If you did not request this, please ignore this email.

Regards,
HireAI Team
"""

    msg = Message(
        subject=subject,
        recipients=[to_email],
        body=body
    )

    mail.send(msg)
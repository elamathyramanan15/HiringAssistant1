import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content


def _get_sendgrid_client():
    api_key = os.getenv("SENDGRID_API_KEY")

    if not api_key:
        raise Exception("SENDGRID_API_KEY is missing")

    return SendGridAPIClient(api_key)


def _get_sender():
    from_email = os.getenv("SENDGRID_FROM_EMAIL", "hireai.team@gmail.com")
    from_name = os.getenv("SENDGRID_FROM_NAME", "HireAI Team")
    return Email(from_email, from_name)


def _send_email(to_email, subject, html_body):
    message = Mail(
        from_email=_get_sender(),
        to_emails=To(to_email),
        subject=subject,
        html_content=Content("text/html", html_body)
    )

    sg = _get_sendgrid_client()
    response = sg.send(message)

    print(f"SendGrid email sent to: {to_email}")
    print(f"SendGrid status code: {response.status_code}")

    return True


def send_reset_password_email(to_email, reset_link):
    try:
        subject = "Reset Your HireAI Password"

        html_body = f"""
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Reset Your HireAI Password</h2>

            <p>Hello,</p>

            <p>We received a request to reset your HireAI account password.</p>

            <p>Please click the button below to create a new password:</p>

            <p>
                <a href="{reset_link}"
                   style="display:inline-block;padding:12px 20px;background:#6d28d9;color:white;text-decoration:none;border-radius:8px;">
                    Reset Password
                </a>
            </p>

            <p>If the button does not work, copy and paste this link into your browser:</p>
            <p>{reset_link}</p>

            <p>This link will expire in 30 minutes.</p>

            <p>If you did not request this, please ignore this email.</p>

            <p>Regards,<br/>HireAI Team</p>
        </div>
        """

        return _send_email(to_email, subject, html_body)

    except Exception as e:
        print(f"SENDGRID RESET EMAIL ERROR: {str(e)}")
        raise


def send_recruiter_credentials_email(to_email, recruiter_name, login_email, temporary_password):
    try:
        frontend_url = os.getenv("FRONTEND_RESET_URL", "http://localhost:3000")

        subject = "Your HireAI Recruiter Account Credentials"

        html_body = f"""
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Welcome to HireAI</h2>

            <p>Hello {recruiter_name},</p>

            <p>Your recruiter account has been created successfully by the Admin.</p>

            <p>Please use the credentials below to log in:</p>

            <div style="background:#f4f0ff;padding:16px;border-radius:8px;margin:16px 0;">
                <p><strong>Login Email:</strong> {login_email}</p>
                <p><strong>Temporary Password:</strong> {temporary_password}</p>
            </div>

            <p>
                <a href="{frontend_url}"
                   style="display:inline-block;padding:12px 20px;background:#6d28d9;color:white;text-decoration:none;border-radius:8px;">
                    Login to HireAI
                </a>
            </p>

            <p>If the button does not work, copy and paste this link into your browser:</p>
            <p>{frontend_url}</p>

            <p>For security, please change your password after your first login.</p>

            <p>Regards,<br/>HireAI Team</p>
        </div>
        """

        return _send_email(to_email, subject, html_body)

    except Exception as e:
        print(f"SENDGRID RECRUITER CREDENTIALS EMAIL ERROR: {str(e)}")
        raise
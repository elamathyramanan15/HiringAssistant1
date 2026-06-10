from flask_mail import Message

from extensions import mail
 
 
def send_reset_password_email(to_email, reset_link):

    try:

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
 
        print(f"Sending reset password email to: {to_email}")

        mail.send(msg)

        print("Reset password email sent successfully")
 
        return True
 
    except Exception as e:

        print(f"EMAIL ERROR: {str(e)}")

        raise
 
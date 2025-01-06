import brevo from "@getbrevo/brevo";
import { config } from "dotenv";

// Load environment variables
config();

const { TransactionalEmailsApi, SendSmtpEmail } = brevo;

// Initialize Brevo API instance
const apiInstance = new TransactionalEmailsApi();
apiInstance.authentications.apiKey.apiKey = process.env.EMAIL_API_KEY;

// Generate confirmation email content with OTP
function generateSendOTPContent(username, otp) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">Hello, ${username}!</h2>
      <p>Thank you for registering with us.</p>
      <p>Please use the following OTP to complete your email verification. This code will expire in <strong>5 minutes</strong>:</p>
      <p style="font-size: 24px; font-weight: bold; color: #4CAF50; letter-spacing: 2px;">${otp}</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <br/>
      <p>Best regards,<br/>The Emind Team</p>
    </div>
  `;
}

class EmailService {
  async sendConfirmationEmail(email, username, otp) {
    const emailContent = generateSendOTPContent(username, otp);

    await this.sendEmail(email, "Confirm Your Account OTP - BekasPakai", emailContent);
  }

  async sendEmail(to, subject, htmlContent) {
    try {
      const sendSmtpEmail = new SendSmtpEmail();

      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = { "email": "d.raihan2004@gmail.com", "name": "BekasPakai" };
      sendSmtpEmail.to = [{ "email": to, "name": to.split("@")[0] }];
      sendSmtpEmail.replyTo = {
        "email": "d.raihan2004@gmail.com",
        "name": "KeepUp",
      };

      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return response;
    } catch (error) {
      console.error(`Failed to send email to ${to}: ${error.message}`);
      throw new Error("Email sending failed");
    }
  }
}

export default new EmailService();

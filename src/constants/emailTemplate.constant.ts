//Constants
import { emailVariables } from '@constants';

//Custom types
import type { IUser } from '@customTypes';

export const verifyUserTemplate = async (verifyEmailUrl: string, user: IUser): Promise<string> => {
  return `
        <div style='font-family: Arial, sans-serif; color: #333;'>
          <p>Hello ${user.name},</p>
          <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the link below:.</p>
          <a 
            href='${verifyEmailUrl}' 
            style='display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;'
          >
            Verify Email
          </a>
          <p>If you didn’t sign up for this account, please ignore this email.</p>
          <p>Thank you</p>
        </div>
      `;
};

export const resetPasswordTemplate = async (resetLink: string, user: IUser): Promise<string> => {
  return `
        <!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <table style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <tr>
      <td>
        <h2>Password Reset Request</h2>
        <p>Hello, <strong>${user.name}</strong>,</p>
        <p>We received a request to reset your password. Click the button below to set a new password. This link expires in
          <strong>${emailVariables.RESET_TOKEN_EXPIRE} ${emailVariables.RESET_TOKEN_UNIT}</strong>.</p>
        <a href=${resetLink} style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
        <p>Thank you,</p>
        <p><strong>The Support Team</strong></p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export const setPasswordTemplate = async (setPasswordLink: string, user: IUser): Promise<string> => {
  const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Set Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0;">
  <table style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <tr>
      <td>
        <h2 style="color: #007bff;">Welcome to Our Platform, {name}!</h2>
        <p>
          We're excited to have you on board. To get started, please set up your account password by clicking the link
          below. This link will expire in
          <strong>{expire} {unit}{plural}.</strong>.
        </p>
        <a href="{link}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Set Password</a>
        <p>If you did not request an account setup, you can ignore this email.</p>
        <p>Thank you, and welcome aboard!</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const values: Record<string, string | number> = {
    name: user.name,
    expire: emailVariables.RESET_TOKEN_EXPIRE,
    unit: emailVariables.RESET_TOKEN_UNIT,
    plural: emailVariables.RESET_TOKEN_EXPIRE > 1 ? 's' : '',
    link: setPasswordLink,
  };

  return template.replace(/{([^}]+)}/g, (_match, key) => String(values[key]));
};

export const sendOtpTemplate = async (otp: string, otpValidTime: string): Promise<string> => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      margin-bottom: 20px;
    }
    .logo img {
      max-width: 120px;
    }
    h1 {
      color: #333333;
    }
    p {
      font-size: 16px;
      color: #555555;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #007BFF;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888888;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Hello,</p>
    <p>Your one-time password (OTP) for verification is:</p>
    <div class="otp">${otp}</div>
    <p>Please use this OTP to complete your verification. This code is valid for the next ${otpValidTime}.</p>
    <p>If you did not request this OTP, please ignore this email or contact support if you have concerns.</p>
    <div class="footer">
      <p>Thank you, <br> The Team</p>
    </div>
  </div>
</body>
</html>
`;
};

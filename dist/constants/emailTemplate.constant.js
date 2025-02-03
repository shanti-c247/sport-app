"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpTemplate = exports.setPasswordTemplate = exports.resetPasswordTemplate = exports.verifyUserTemplate = void 0;
//Constants
const _constants_1 = require("@constants");
const verifyUserTemplate = (verifyEmailUrl, user) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.verifyUserTemplate = verifyUserTemplate;
const resetPasswordTemplate = (resetLink, user) => __awaiter(void 0, void 0, void 0, function* () {
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
          <strong>${_constants_1.emailVariables.RESET_TOKEN_EXPIRE} ${_constants_1.emailVariables.RESET_TOKEN_UNIT}</strong>.</p>
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
});
exports.resetPasswordTemplate = resetPasswordTemplate;
const setPasswordTemplate = (setPasswordLink, user) => __awaiter(void 0, void 0, void 0, function* () {
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
    const values = {
        name: user.name,
        expire: _constants_1.emailVariables.RESET_TOKEN_EXPIRE,
        unit: _constants_1.emailVariables.RESET_TOKEN_UNIT,
        plural: _constants_1.emailVariables.RESET_TOKEN_EXPIRE > 1 ? 's' : '',
        link: setPasswordLink,
    };
    return template.replace(/{([^}]+)}/g, (_match, key) => String(values[key]));
});
exports.setPasswordTemplate = setPasswordTemplate;
const sendOtpTemplate = (otp, otpValidTime) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.sendOtpTemplate = sendOtpTemplate;
//# sourceMappingURL=emailTemplate.constant.js.map
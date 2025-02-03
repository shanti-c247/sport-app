import env from '@config/envVar';
import { logger } from '@config/logger';
import nodemailer from 'nodemailer';

// /**
//  * Create a transporter object using your SMTP provider details
//  */
// const transporter = nodemailer.createTransport({
//   service: env.SMTP_MAIL_SERVICE,
//   host: env.SMTP_HOST,
//   port: Number(env.SMTP_PORT),
//   secure: Boolean(env.SMTP_IS_SECURE),
//   auth: {
//     user: env.SMTP_SENDER_EMAIL,
//     pass: env.SMTP_SENDER_PASSWORD,
//   },
// });

// /**
//  * Sends an email using the configured SMTP transporter.
//  * @param {string} email - The recipient's email address.
//  * @param {string} subject - The subject of the email.
//  * @param {string} message - The HTML message to be sent in the email body.
//  * @returns {Promise<{ success: boolean, data?: object, error?: any }>}
//  *          An object indicating success status, with additional data or error information.
//  */

// export const sendEmail = async (email: string, subject: string, message: string) => {
//   try {
//     const info = await transporter.sendMail({
//       from: env.SMTP_SENDER_EMAIL,
//       to: email,
//       subject,
//       html: message,
//     });

//     return { success: true, data: info };
//   } catch (error) {
//     logger.error(`Error sending email: ${error}`);
//     return { success: false, error };
//   }
// };


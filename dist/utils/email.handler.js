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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const envVar_1 = __importDefault(require("@config/envVar"));
const logger_1 = require("@config/logger");
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Create a transporter object using your SMTP provider details
 */
const transporter = nodemailer_1.default.createTransport({
    service: envVar_1.default.SMTP_MAIL_SERVICE,
    host: envVar_1.default.SMTP_HOST,
    port: Number(envVar_1.default.SMTP_PORT),
    secure: Boolean(envVar_1.default.SMTP_IS_SECURE),
    auth: {
        user: envVar_1.default.SMTP_SENDER_EMAIL,
        pass: envVar_1.default.SMTP_SENDER_PASSWORD,
    },
});
/**
 * Sends an email using the configured SMTP transporter.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The HTML message to be sent in the email body.
 * @returns {Promise<{ success: boolean, data?: object, error?: any }>}
 *          An object indicating success status, with additional data or error information.
 */
const sendEmail = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: envVar_1.default.SMTP_SENDER_EMAIL,
            to: email,
            subject,
            html: message,
        });
        return { success: true, data: info };
    }
    catch (error) {
        logger_1.logger.error(`Error sending email: ${error}`);
        return { success: false, error };
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.handler.js.map
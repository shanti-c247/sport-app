"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("@constants");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'HOST',
    'API_URL',
    'JWT_SECRET',
    'AUTH_COOKIE_NAME',
    'MONGODB_URI',
    'CORS_ORIGIN'
];
// Object to hold exported environment variables
const env = {};
// Ensure all required variables are present and add them to `env`
requiredEnvVars.forEach((key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${_constants_1.commonMessages.MISSING_ENV_VARIABLES}: ${key}`);
    }
    env[key] = value; // Dynamically add to the export object
});
exports.default = env;
//# sourceMappingURL=envVar.js.map
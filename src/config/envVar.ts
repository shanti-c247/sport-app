
import { commonMessages } from '@constants';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
const env: Record<string, string> = {};

// Ensure all required variables are present and add them to `env`
requiredEnvVars.forEach((key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${commonMessages.MISSING_ENV_VARIABLES}: ${key}`);
  }
  env[key] = value; // Dynamically add to the export object
});

export default env;
    
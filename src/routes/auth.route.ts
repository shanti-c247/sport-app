//Controllers
import { authController } from '@controllers';
//Middlewares
import {  validate } from '@middlewares';
//Validations
import { authValidations } from '@validations';
//Third-party modules
import express from 'express';

const router = express.Router();

// Rate Limiter for forget password functionality - max 2 requests in 15 minutes
// Using constants for max attempts and window duration


router.post('/register', validate(authValidations.registerSchema), authController.register);
router.post('/login', validate(authValidations.loginSchema), authController.login);

export default router;

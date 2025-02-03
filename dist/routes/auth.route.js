"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Controllers
const _controllers_1 = require("@controllers");
//Middlewares
const _middlewares_1 = require("@middlewares");
//Validations
const _validations_1 = require("@validations");
//Third-party modules
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Rate Limiter for forget password functionality - max 2 requests in 15 minutes
// Using constants for max attempts and window duration
router.post('/register', (0, _middlewares_1.validate)(_validations_1.authValidations.registerSchema), _controllers_1.authController.register);
router.post('/login', (0, _middlewares_1.validate)(_validations_1.authValidations.loginSchema), _controllers_1.authController.login);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
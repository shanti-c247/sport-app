"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const authSchemas = {
    // User
    // User Creation
    AuthCreateUserRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: _utils_1.authHandler.authRandomData('registerRequest'),
    },
    // User Login Request
    LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: _utils_1.authHandler.authRandomData('loginRequest'),
    },
    // User Login Response
    LoginResponse: {
        type: 'object',
        required: ['token', 'role'],
        properties: _utils_1.authHandler.authRandomData('loginResponse'),
    },
};
exports.default = authSchemas;
//# sourceMappingURL=schemas.js.map
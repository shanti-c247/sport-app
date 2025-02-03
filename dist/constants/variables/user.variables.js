"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRegex = exports.paginations = exports.AUTH_MODULE_SWAGGER_OPERATIONS_PATH = exports.USER_MODULE_SWAGGER_OPERATIONS_PATH = exports.SET_PASSWORD_TOKEN_UNIT = exports.SET_PASSWORD_EXPIRE = void 0;
exports.SET_PASSWORD_EXPIRE = 60; // Expiration time (depends upon SET_PASSWORD_TOKEN_UNIT ) for password reset tokens. The convertTime function will convert this value into milliseconds.
exports.SET_PASSWORD_TOKEN_UNIT = 'minute'; // Supported units: year, month, day, hour, minute, second, millisecond
exports.USER_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/user/operations.ts'; // user module swagger operations path
exports.AUTH_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/auth/operations.ts';
exports.paginations = {
    ITEM_LIMIT: 50,
    DEFAULT_PAGE: 0,
};
// Define a custom regular expression to match the DD-MM-YYYY format 
exports.dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
//# sourceMappingURL=user.variables.js.map
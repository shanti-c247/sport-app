"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const authResponses = {
    AuthUserCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.commonMessages.USER_REGISTERD, {
        $ref: '#/components/schemas/AuthCreateUserRequest',
    }),
    UserLoggedIn: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.commonMessages.LOGIN_SUCCESS, {
        $ref: '#/components/schemas/LoginResponse',
    }),
};
exports.default = authResponses;
//# sourceMappingURL=responses.js.map
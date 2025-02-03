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
exports.login = exports.register = void 0;
// Built-in modules
const _constants_1 = require("@constants");
const _enums_1 = require("@enums");
// Models
const _models_1 = require("@models");
// Utilities
const _utils_1 = require("@utils");
/**
 * Handles user registration
 * @param {IRegisterBody} data User registration data
 * @returns {Promise<IApiResponse>} Response containing the created user or error information
 */
const register = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const formatEmail = email.toLowerCase();
    const checkUser = yield _models_1.User.findOne({ email: formatEmail });
    if (checkUser) {
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_ALREADY_EXISTS,
            data: null,
        };
    }
    const hashedPassword = yield _utils_1.authHandler.hashPassword(password);
    const user = yield _models_1.User.create({
        name,
        email: formatEmail,
        password: hashedPassword,
        role: _enums_1.Role.Admin,
    });
    if (!user) {
        return {
            status: _constants_1.UNAUTHORIZE,
            success: false,
            message: _constants_1.commonMessages.INTERNAL_SERVER_ERROR,
            data: null,
        };
    }
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.commonMessages.USER_REGISTERD,
        data: null,
    };
});
exports.register = register;
/**
 * Login a user with email and password. If the user has TwoFA enabled, a verification code will be sent to the selected method.
 * @param {ILoginBody} data - The login data
 * @param {Response} res - The response
 * @returns {Promise<IApiResponse>} - The response
 */
const login = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formatEmail = email.toLowerCase();
    //  'name email role password isTwoAuthEnabled preferredTwoFAMethods,'
    const user = yield _models_1.User.findOne({ email: formatEmail });
    if (!user) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    if (user && user.status === 0) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    const isMatch = yield _utils_1.authHandler.comparePassword(password, user.password);
    if (!isMatch) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.INVALID_CREDENTIALS,
            data: null,
        };
    }
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.commonMessages.LOGIN_SUCCESS,
        data: {
            token: yield _utils_1.generateTokenHandler.generateAuthToken(res, payload),
            role: user.role,
            isTwoAuthEnabled: user.isTwoAuthEnabled,
        },
    };
});
exports.login = login;
//# sourceMappingURL=auth.service.js.map
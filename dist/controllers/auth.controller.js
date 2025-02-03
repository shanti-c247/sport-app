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
const _middlewares_1 = require("@middlewares");
//Services
const _services_1 = require("@services");
//Utils
const _utils_1 = require("@utils");
/**
 * Handles registering a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield _services_1.authService.register(req.body.name, req.body.email, req.body.password);
        const { success, message, status, data } = response;
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.register = register;
/**
 * Handles login a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const response = yield _services_1.authService.login(req.body.email, req.body.password, res);
        const { success, message, status, data } = response;
        if (success) {
            (0, _middlewares_1.responseHandler)(res, message, status, data);
        }
        else {
            next(new _utils_1.ErrorHandler(message, status, data));
        }
    }
    catch (error) {
        (0, _utils_1.catchHandler)(error, next);
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map
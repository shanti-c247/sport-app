"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
//Third-party modules
const joi_1 = __importDefault(require("joi"));
//Config
const index_1 = require("@config/index");
//Enums
const _enums_1 = require("@enums");
//Constants
const _constants_1 = require("@constants");
const _constants_2 = require("@constants");
exports.createUserSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string()
            .max(_constants_1.commonVariables.MAX_CHARACTERS_LENGTH)
            .regex(_constants_1.commonVariables.NAME_REGEX)
            .required()
            .messages(_constants_1.userMessages.INVALID_NAME_FORMAT_MESSAGE),
        email: joi_1.default.string().email().required(),
        role: joi_1.default.number()
            .integer()
            .valid(index_1.roles[0], index_1.roles[1])
            .default(index_1.defaultRole),
        status: joi_1.default.number().integer().valid(_enums_1.UserStatus.Inactive, _enums_1.UserStatus.Active).default(_enums_1.UserStatus.Inactive),
        dateOfBirth: joi_1.default.string()
            .pattern(_constants_2.userVariables.dateRegex).message('DateOfBirth must be in DD-MM-YYYY format.')
            .optional(),
        countryCode: joi_1.default.string().optional(),
        phoneNumber: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        picture: joi_1.default.string().optional(),
    }),
};
exports.updateUserSchema = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required(), // Ensure 'id' is provided in params
    }),
    body: joi_1.default.object({
        name: joi_1.default.string()
            .max(_constants_1.commonVariables.MAX_CHARACTERS_LENGTH)
            .regex(_constants_1.commonVariables.NAME_REGEX)
            .messages(_constants_1.userMessages.INVALID_NAME_FORMAT_MESSAGE)
            .optional(),
        email: joi_1.default.string().email().optional(),
        role: joi_1.default.number()
            .integer()
            .valid(index_1.roles[0], index_1.roles[1])
            .default(index_1.defaultRole)
            .optional(),
        status: joi_1.default.number().integer().valid(_enums_1.UserStatus.Inactive, _enums_1.UserStatus.Active).default(_enums_1.UserStatus.Active).optional(), // assuming status is either 0 or 1
        countryCode: joi_1.default.string().optional(),
        phoneNumber: joi_1.default.string().optional(),
        dateOfBirth: joi_1.default.string()
            .pattern(_constants_2.userVariables.dateRegex).message('DateOfBirth must be in DD-MM-YYYY format.')
            .optional(),
        description: joi_1.default.string().optional(),
        picture: joi_1.default.string().optional(),
    }),
};
//# sourceMappingURL=user.validation.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventValidationSchema = exports.createEventValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEventValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    date: joi_1.default.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required().custom((value, helpers) => {
        const [day, month, year] = value.split('-').map(Number);
        if (month < 1 || month > 12) {
            return helpers.error('any.invalid');
        }
        return value;
    }),
    description: joi_1.default.string().optional()
});
exports.updateEventValidationSchema = joi_1.default.object({
    eventId: joi_1.default.string().required(),
    title: joi_1.default.string().optional(),
    date: joi_1.default.string().pattern(/^\d{2}-\d{2}-\d{4}$/).optional().custom((value, helpers) => {
        const [day, month, year] = value.split('-').map(Number);
        if (month < 1 || month > 12) {
            return helpers.error('any.invalid');
        }
        return value;
    }),
    description: joi_1.default.string().optional()
});
//# sourceMappingURL=event.validation.js.map
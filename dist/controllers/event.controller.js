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
exports.deleteEvent = exports.getAllEvents = exports.getEventById = exports.updateEvent = exports.createEvent = void 0;
// Constants
// Middlewares
const _constants_1 = require("@constants");
const _middlewares_1 = require("@middlewares");
// Services
const _services_1 = require("@services");
// Utils
const _utils_1 = require("@utils");
/**
 * Handles local event uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new _utils_1.ErrorHandler(_constants_1.commonMessages.USER_NOT_FOUND, _constants_1.UNAUTHORIZE, null));
        }
        const { title, eventDate, description } = req.body;
        const response = yield _services_1.eventService.addEvent(user, title, eventDate, description);
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
exports.createEvent = createEvent;
/**
 * Handles local event uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, title, eventDate, description } = req.body;
        const response = yield _services_1.eventService.partialUpdate(eventId, { title, eventDate, description });
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
exports.updateEvent = updateEvent;
/**
 * Handles get event details from local storage
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getEventById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const response = yield _services_1.eventService.getEventById(eventId);
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
exports.getEventById = getEventById;
/**
 * Handles retrieving users.
 * otherwise, fetch all events.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, sortBy, orderBy, search } = req.query;
        const { status, success, message, data } = yield _services_1.eventService.getAllEvents(Number(page), Number(limit), sortBy, orderBy, search);
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
exports.getAllEvents = getAllEvents;
/**
 * Handles local event uploading
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield _services_1.eventService.deleteEventById(req.params.eventId);
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
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=event.controller.js.map
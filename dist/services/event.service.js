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
exports.getAllEvents = exports.deleteEventById = exports.partialUpdate = exports.getEventById = exports.addEvent = void 0;
const _constants_1 = require("@constants");
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const mongoose_1 = require("mongoose");
/**
 * Save a new event in the database.
 * @param {IEvent} event - Event data to save
 * @returns {IApiResponse} Response containing the status of the save operation
 */
const addEvent = (user, title, eventDate, description) => __awaiter(void 0, void 0, void 0, function* () {
    const newEvent = new _models_1.Event({
        userId: user.id,
        title: title,
        eventDate: eventDate,
        description: description
    });
    yield newEvent.save();
    return {
        status: _constants_1.CREATED,
        success: true,
        message: _constants_1.eventMessages.CREATE_EVENT,
        data: newEvent,
    };
});
exports.addEvent = addEvent;
/**
 * Get an event by its ID.
 * @param {string} eventId - ID of the event to retrieve
 * @returns {IApiResponse} Response containing the event data or an error message
 */
const getEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(eventId)) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.eventMessages.INVALID_EVENT_ID,
            data: null
        };
    }
    const event = yield _models_1.Event.findById(eventId);
    if (!event) {
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.eventMessages.EVENT_NOT_FOUND,
            data: null
        };
    }
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.eventMessages.EVENT_FETCHED,
        data: event,
    };
});
exports.getEventById = getEventById;
/**
 * Update an event by its ID.
 * @param {string} eventId - ID of the event to update
 * @param {Partial<IEvent>} updateData - Data to update the event with
 * @returns {IApiResponse} Response containing the status of the update operation
 */
const partialUpdate = (eventId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(eventId)) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.eventMessages.INVALID_EVENT_ID,
            data: null
        };
    }
    const updatedEvent = yield _models_1.Event.findByIdAndUpdate(eventId, updateData, { new: true });
    if (!updatedEvent) {
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.eventMessages.EVENT_NOT_FOUND,
            data: null
        };
    }
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.eventMessages.EVENT_UPDATED,
        data: updatedEvent,
    };
});
exports.partialUpdate = partialUpdate;
/**
 * Delete an event by its ID.
 * @param {string} eventId - ID of the event to delete
 * @returns {IApiResponse} Response containing the status of the delete operation
 */
const deleteEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(eventId)) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.eventMessages.INVALID_EVENT_ID,
            data: null
        };
    }
    const deletedEvent = yield _models_1.Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
        return {
            status: _constants_1.NOT_FOUND,
            success: false,
            message: _constants_1.eventMessages.EVENT_NOT_FOUND,
            data: null
        };
    }
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.eventMessages.EVENT_DELETED,
        data: deletedEvent,
    };
});
exports.deleteEventById = deleteEventById;
/**
 * Get all events with pagination, sorting, and searching.
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of events per page
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Order of sorting (asc or desc)
 * @param {string} search - Search term to filter events
 * @returns {IApiResponse} Response containing the paginated list of events
 */
const getAllEvents = (pageNumber, pageSize, sortBy, // -1 , 1,
sortOrder, search) => __awaiter(void 0, void 0, void 0, function* () {
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const { limit, offset } = _utils_1.paginationHandler.getPagination(pageNumber, pageSize);
    const match = {};
    if (search) {
        match.$or = [
            { title: { $regex: search, $options: 'i' } },
        ];
    }
    const events = yield _models_1.Event.aggregate([
        { $match: match },
        { $sort: sortOptions },
        { $skip: offset },
        { $limit: limit },
    ]);
    const totalEvents = yield _models_1.Event.countDocuments(match);
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.eventMessages.EVENTS_FOUND,
        data: { total: totalEvents, events: events }
    };
});
exports.getAllEvents = getAllEvents;
//# sourceMappingURL=event.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const eventSchemas = {
    // Event Creation
    CreateEventRequest: {
        type: 'object',
        required: ['title', 'eventDate'],
        properties: _utils_1.eventHandler.eventRandomData('createEventRequest'),
    },
    // Event Update
    UpdateEventRequest: {
        type: 'object',
        properties: _utils_1.eventHandler.eventRandomData('updateEventRequest'),
    },
};
exports.default = eventSchemas;
//# sourceMappingURL=schemas.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const eventResponses = {
    UserCreated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.eventMessages.CREATE_EVENT, {
        $ref: '',
    }),
    UserUpdated: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.eventMessages.EVENT_UPDATED, {
        $ref: '',
    }),
};
exports.default = eventResponses;
//# sourceMappingURL=responses.js.map
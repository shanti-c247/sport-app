"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _middlewares_1 = require("@middlewares");
const _validations_1 = require("@validations");
const _controllers_1 = require("@controllers");
const router = (0, express_1.Router)();
// Create a new event
router.post('/', _middlewares_1.authenticate, (0, _middlewares_1.validate)(_validations_1.eventValidations.createEventValidationSchema), _controllers_1.eventController.createEvent);
// Get a single event by ID
router.get('/:eventId', _controllers_1.eventController.getEventById);
// Update an event by ID
router.put('/:eventId', _middlewares_1.authenticate, (0, _middlewares_1.validate)(_validations_1.eventValidations.updateEventValidationSchema), _controllers_1.eventController.updateEvent);
// Delete an event by ID
router.delete('/:eventId', _middlewares_1.authenticate, _controllers_1.eventController.deleteEvent);
// Get all events
router.get('/', _controllers_1.eventController.getAllEvents);
exports.default = router;
//# sourceMappingURL=event.route.js.map
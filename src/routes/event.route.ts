import { Router } from 'express';
import { authenticate, validate } from '@middlewares';
import { eventValidations } from '@validations';
import { eventController } from '@controllers';

const router = Router();

// Create a new event
router.post('/', authenticate, validate(eventValidations.createEventValidationSchema), eventController.createEvent);

// Get a single event by ID
router.get('/:eventId', eventController.getEventById);

// Update an event by ID
router.put('/:eventId', authenticate, validate(eventValidations.updateEventValidationSchema), eventController.updateEvent);

// Delete an event by ID
router.delete('/:eventId', authenticate, eventController.deleteEvent);

// Get all events
router.get('/', eventController.getAllEvents);

export default router;
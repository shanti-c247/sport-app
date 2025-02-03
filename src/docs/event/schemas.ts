import { eventHandler } from '@utils';

const eventSchemas = {
  // Event Creation
  CreateEventRequest: {
    type: 'object',
    required: ['title', 'eventDate'],
    properties: eventHandler.eventRandomData('createEventRequest'),
  },
  // Event Update
  UpdateEventRequest: {
    type: 'object',
    properties: eventHandler.eventRandomData('updateEventRequest'),
  },
};
export default eventSchemas;

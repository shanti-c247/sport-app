// constants
import { eventMessages } from '@constants';
// utils
import { swaggerHandler } from '@utils';


const eventResponses = {
  UserCreated: swaggerHandler.createSuccessResponse(eventMessages.CREATE_EVENT, {
    $ref: '',
  }),
  UserUpdated: swaggerHandler.createSuccessResponse(eventMessages.EVENT_UPDATED, {
    $ref: '',
  }),
};

export default eventResponses;


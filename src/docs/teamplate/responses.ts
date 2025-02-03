// constants
import { templateMessages } from '@constants';
// utils
import { swaggerHandler } from '@utils';


const templateBResponses = {
  TeamplateBCreated: swaggerHandler.createSuccessResponse(templateMessages.TEAMPLATE_CREATE_SUCCESS, {
    $ref: '',
  }),
  TeamplateBUpdated: swaggerHandler.createSuccessResponse(templateMessages.TEAMPLATE_UPDATED_SUCCESS, {
    $ref: '',
  }),
};

export default templateBResponses;


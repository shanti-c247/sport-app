// constants
import { commonMessages } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const authResponses = {
  AuthUserCreated: swaggerHandler.createSuccessResponse(commonMessages.USER_REGISTERD, {
    $ref: '#/components/schemas/AuthCreateUserRequest',
  }),


  UserLoggedIn: swaggerHandler.createSuccessResponse(commonMessages.LOGIN_SUCCESS, {
    $ref: '#/components/schemas/LoginResponse',
  }),
};

export default authResponses;

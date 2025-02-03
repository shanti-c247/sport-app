import { authHandler } from '@utils';

const authSchemas = {
  // User
  // User Creation
  AuthCreateUserRequest: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: authHandler.authRandomData('registerRequest'),
  },
  // User Login Request
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: authHandler.authRandomData('loginRequest'),
  },
  // User Login Response
  LoginResponse: {
    type: 'object',
    required: ['token', 'role'],
    properties: authHandler.authRandomData('loginResponse'),
  },
};

export default authSchemas;

export const SET_PASSWORD_EXPIRE = 60; // Expiration time (depends upon SET_PASSWORD_TOKEN_UNIT ) for password reset tokens. The convertTime function will convert this value into milliseconds.
export const SET_PASSWORD_TOKEN_UNIT = 'minute'; // Supported units: year, month, day, hour, minute, second, millisecond
export const USER_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/user/operations.ts'; // user module swagger operations path
export const AUTH_MODULE_SWAGGER_OPERATIONS_PATH = 'src/docs/auth/operations.ts';
export const paginations = {
  ITEM_LIMIT: 50,
  DEFAULT_PAGE: 0,
};
// Define a custom regular expression to match the DD-MM-YYYY format 
export const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
//Third-party modules
import Joi from 'joi';

//Constants
import { commonMessages, commonVariables } from '@constants';

export const registerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(commonVariables.PASSWORD_MIN_LENGTH)
      .max(commonVariables.PASSWORD_MAX_LENGTH)
      .pattern(new RegExp(`${commonVariables.PASSWORD_REGEX}`))
      .required()
      .messages(commonMessages.INVALID_PASSWORD_FORMAT_MESSAGE),
    phoneNumber: Joi.string().optional(),
    countryCode: Joi.string().optional(),
  }).unknown(false),
};

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(false),
};

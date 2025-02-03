//Third-party modules
import Joi from 'joi';

//Config
import { defaultRole, roles } from '@config/index';

//Enums
import { UserStatus } from '@enums';

//Constants
import { commonVariables, userMessages } from '@constants';
import { userVariables } from '@constants';

export const createUserSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .regex(commonVariables.NAME_REGEX)
      .required()
      .messages(userMessages.INVALID_NAME_FORMAT_MESSAGE),
    email: Joi.string().email().required(),
    role: Joi.number()
      .integer()
      .valid(roles[0], roles[1])
      .default(defaultRole),
    status: Joi.number().integer().valid(UserStatus.Inactive, UserStatus.Active).default(UserStatus.Inactive),
    dateOfBirth: Joi.string()
      .pattern(userVariables.dateRegex).message('DateOfBirth must be in DD-MM-YYYY format.')
      .optional()
    ,
    countryCode: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    description: Joi.string().optional(),
    picture: Joi.string().optional(),
  }),

};

export const updateUserSchema = {
  params: Joi.object({
    userId: Joi.string().required(), // Ensure 'id' is provided in params
  }),
  body: Joi.object({
    name: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .regex(commonVariables.NAME_REGEX)
      .messages(userMessages.INVALID_NAME_FORMAT_MESSAGE)
      .optional(),
    email: Joi.string().email().optional(),
    role: Joi.number()
      .integer()
      .valid(roles[0], roles[1])
      .default(defaultRole)
      .optional(),
    status: Joi.number().integer().valid(UserStatus.Inactive, UserStatus.Active).default(UserStatus.Active).optional(), // assuming status is either 0 or 1
    countryCode: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    dateOfBirth: Joi.string()
    .pattern(userVariables.dateRegex).message('DateOfBirth must be in DD-MM-YYYY format.')
    .optional(),
    description: Joi.string().optional(),
    picture: Joi.string().optional(),
  }),


};

import Joi from 'joi';

export const createTeamplateValidationSchema = Joi.object({
    htmlContent: Joi.string().optional(),
    cssContent: Joi.string().optional()
});
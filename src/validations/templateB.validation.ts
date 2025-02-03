import Joi from 'joi';

export const sContentValidationSchema = Joi.object({
    id: Joi.number().required(),
    src: Joi.string().uri().required(),
    description: Joi.string().required(),
    isBanner: Joi.boolean().required()
});

export const bioValidationSchema = Joi.object({
    profileImage: Joi.string().optional(),
    title: Joi.string().optional(),
    content: Joi.string().optional()
});

export const eventValidationSchema = Joi.object({
    title: Joi.string().optional(),
    date: Joi.string().optional(),
    description: Joi.string().optional()
});

export const mainValidationSchema = Joi.object({
    sContent: Joi.array().items(sContentValidationSchema).required(),
    bio: bioValidationSchema.required(),
    event: eventValidationSchema.required()
});
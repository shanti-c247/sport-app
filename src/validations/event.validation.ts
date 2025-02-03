import Joi from 'joi';

export const createEventValidationSchema = Joi.object({
    title: Joi.string().required(),
    date: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required().custom((value, helpers) => {
        const [day, month, year] = value.split('-').map(Number);
        if (month < 1 || month > 12) {
            return helpers.error('any.invalid');
        }
        return value;
    }),
    description: Joi.string().optional()
});

export const updateEventValidationSchema = Joi.object({
    eventId: Joi.string().required(),
    title: Joi.string().optional(),
    date: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).optional().custom((value, helpers) => {
        const [day, month, year] = value.split('-').map(Number);
        if (month < 1 || month > 12) {
            return helpers.error('any.invalid');
        }
        return value;
    }),
    description: Joi.string().optional()
});
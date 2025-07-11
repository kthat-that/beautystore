const Joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, { allowUnknown: true });

const bookValidateSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required.',
        'any.required': 'Name is required.',
    }),
});


module.exports = validator(bookValidateSchema);

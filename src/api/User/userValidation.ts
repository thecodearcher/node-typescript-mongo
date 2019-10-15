import Joi from "@hapi/joi";

export const UserValidationSchema = Joi.object().keys({
    name: Joi.string().alphanum().max(30).required(),
    email: Joi.string().email().required(),
});

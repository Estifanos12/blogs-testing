import Joi from "joi";

export const CredentialValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

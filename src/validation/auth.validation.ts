import Joi, { ValidationError } from "joi";

export const CredentialValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const validateAuthUserRequest = (user: any): { message: string } | typeof ValidationError => {
    const { error } = CredentialValidation.validate(user, {
        convert: false
    });

    if (error) return error;

    return { message: "Success" };
};

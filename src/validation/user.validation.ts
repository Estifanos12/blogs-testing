import Joi, { ValidationError } from "joi";

export const UserValidation = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const UserIdValidation = Joi.string().alphanum().required();

export const validateUserRequest = (user: any): { message: string } | typeof ValidationError => {
    const { error } = UserValidation.validate(user, {
        convert: false
    });

    if (error) return error;

    return { message: "Success" };
};

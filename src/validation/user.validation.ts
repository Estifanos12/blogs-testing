import Joi from "joi";

export const UserValidation = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const UserIdValidation = Joi.string().alphanum().required();

export const validateUserRequest = async (user: any): Promise<{ message: string }> => {
    const { error } = UserValidation.validate(user, {
        convert: false
    });

    if (error) return { message: error.details[0].message };

    return { message: "Success" };
};

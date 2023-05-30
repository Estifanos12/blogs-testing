import Joi, { ValidationError } from "joi";

export const PostValidation = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    vote: Joi.number().required(),
    author: Joi.string().min(6).required()
});

export const PostIdValidation = Joi.string().alphanum().required();

export const UpdatePostValidation = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6).required()
});

export const validatePostRequest = (post: any): { message: string } | typeof ValidationError => {
    const { error } = PostValidation.validate(post, {
        convert: false
    });

    if (error) return error;

    return { message: "Success" };
};

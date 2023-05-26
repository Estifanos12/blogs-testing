import Joi from "joi";

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

export const validatePostRequest = async (post: any): Promise<{ message: string }> => {
    const { error } = PostValidation.validate(post, {
        convert: false
    });

    if (error) return { message: error.details[0].message };

    return { message: "Success" };
};

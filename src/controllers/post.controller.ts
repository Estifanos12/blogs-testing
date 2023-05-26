import { Request, Response, NextFunction } from "express";

import { Post } from "../models/post.model";
import { PostValidation, PostIdValidation, UpdatePostValidation } from "../validation/post.validation";
import { IPost, IUpdatePost } from "../interfaces/post.interface";

/**
 * Create a new post
 * @param req
 * @param res
 * @param next
 */
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(await req.body);
    try {
        const postModelValidate: IPost = await PostValidation.validateAsync(req.body);

        const post = new Post({
            title: postModelValidate.title,
            description: postModelValidate.description,
            vote: postModelValidate.vote,
            author: postModelValidate.author
        });

        const savedPost = await post.save();
        return res.status(200).send(savedPost);
    } catch (error: any) {
        if (error.isJoi === true) {
            return next(
                res.status(400).json({
                    message: "Invalid details provided"
                })
            );
        }
        next(error);
    }
};

/**
 * Get all posts
 * @param req
 * @param res
 * @param next
 */
export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find().select("title description vote, createdAt").populate("author", "username name email");

        if (!posts) return res.status(404).json({ message: "No post found" });

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

/**
 * Get single post
 * @param req
 * @param res
 * @param next
 */
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const validated_id: string = await PostIdValidation.validateAsync(req.params.postId);

    if (!validated_id) {
        return res.status(400).json({
            message: "Invalid details provided"
        });
    }

    try {
        const post = await Post.findById(validated_id).select("_id title description vote createdAt updatedAt").populate("author", "username name email");

        if (!post)
            return res.status(404).json({
                message: "Post not found"
            });

        return res.status(200).json(post);
    } catch (error: any) {
        if (error.isJoi === true) return next(res.status(400).json({ message: "Invalid details provided" }));

        next(error);
    }
};

/**
 * Delete post
 * @param req
 * @param res
 * @param next
 */
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated_id = await PostIdValidation.validateAsync(req.params.postId);

        if (!validated_id)
            return res.status(400).json({
                message: "Invalid details provided"
            });

        const deletedPost = await Post.findByIdAndDelete(validated_id);

        if (!deletedPost)
            return res.status(404).json({
                message: "Post not found"
            });

        res.status(200).json(deletedPost);
    } catch (error: any) {
        if (error.isJoi === true) {
            return res.status(400).json({
                message: "Invalid details provided"
            });
        }
        next(error);
    }
};

/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated_body: IUpdatePost = await UpdatePostValidation.validateAsync(req.body);

        if (!validated_body) return res.status(400).json({ message: "Invalid details provided" });

        const updatedPost = await Post.findByIdAndUpdate(
            {
                _id: req.params.postId
            },
            {
                $set: {
                    title: validated_body.title,
                    description: validated_body.description
                }
            }
        );

        if (!updatedPost)
            return res.status(404).json({
                message: "Post not found"
            });

        res.status(200).json(updatedPost);
    } catch (error: any) {
        if (error.isJoi === true) {
            return next(
                res.status(400).json({
                    message: "Invalid details provided"
                })
            );
        }
        next(error);
    }
};

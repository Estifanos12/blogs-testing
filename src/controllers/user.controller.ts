import { Request, Response, NextFunction } from "express";

import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { UserValidation, UserIdValidation } from "../validation/user.validation";

/**
 * Create new user
 * @param req
 * @param res
 * @param next
 */

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validateUserModel = await UserValidation.validateAsync(req.body);

        if (!validateUserModel) return res.status(400).json({ message: "Invalid details provided" });

        const checkDuplicateUserName = await User.findOne({
            username: validateUserModel.username
        });

        const checkDuplicateEmail = await User.findOne({
            email: validateUserModel.email
        });

        if (checkDuplicateEmail || checkDuplicateUserName || (checkDuplicateEmail && checkDuplicateUserName))
            return res.status(409).send({
                message: "Username or email already exists"
            });

        const user = new User({
            username: validateUserModel.username,
            name: validateUserModel.name,
            email: validateUserModel.email
        });

        const savedUser = await user.save();

        return res.status(200).send(savedUser);
    } catch (error: any) {
        if (error.isJoi === true) {
            return res.status(400).send({
                message: "Invalid details provided"
            });
        }
        next(error);
    }
};

/**
 * Get All Users
 * @param req
 * @param res
 * @param next
 */

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        if (!users)
            return res.status(400).json({
                message: "Users not found"
            });
        return res.status(200).json(users);
    } catch (error: any) {
        console.log(error);
        next(error);
    }
};

/**
 * Get a user
 * @param req
 * @param res
 * @param next
 */

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated_id = await UserIdValidation.validateAsync(req.params.userId);
        if (!validated_id)
            return res.status(400).json({
                message: "Invalid details provided"
            });

        const user = await User.findById(validated_id);
        if (!user)
            return res.status(404).json({
                message: "User not found"
            });

        res.status(200).json(user);
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
 * Delete a user
 * @param req
 * @param res
 * @param next
 */

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated_id = await UserIdValidation.validateAsync(req.params.userId);
        if (!validated_id)
            return res.status(400).json({
                message: "Invalid details provided"
            });

        const deletedUser = await User.findByIdAndDelete(validated_id);

        if (!deleteUser)
            return res.status(404).json({
                message: "User not found"
            });

        res.status(200).json(deletedUser);
    } catch (error: any) {
        if (error.isJoi === true) {
            return res.status(404).json({
                message: "Invalid details provided"
            });
        }
        next(error);
    }
};

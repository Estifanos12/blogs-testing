import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 255,
            lowercase: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },

    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);

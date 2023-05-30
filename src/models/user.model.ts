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
        },
        password: {
            type: String,
            required: true
        }
    },

    { timestamps: true }
);

UserSchema.set('toJSON', {
    transform: (_, obj) => {
        obj.id = obj._id
        delete obj._id
        delete obj.__v
        delete obj.password
    }
})

export const User = mongoose.model<IUser>("User", UserSchema);

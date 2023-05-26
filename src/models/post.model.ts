import mongoose, { Schema } from "mongoose";

import { IPost } from "../interfaces/post.interface";

const PostSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        vote: {
            type: Number,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },

    { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);

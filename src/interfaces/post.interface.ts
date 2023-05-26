import { Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    description: string;
    vote: number;
    author: string;
}

export interface IUpdatePost {
    title: string;
    description: string;
}

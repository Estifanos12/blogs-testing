import { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
}

export interface UserPayload {
    sub: string;
    email: string;
}
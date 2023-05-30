import express from "express";
import { Request, Response, NextFunction } from "express";

import postRoute from "./routes/post.route";
import userRoute from "./routes/user.route";
import { connectDB } from "./utils/connection.util";
import * as dotenv from "dotenv";
import { MONGO_URL } from "./config";
import authRouter from "./routes/auth.route";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//user route
app.use("/user", userRoute);
//post route
app.use("/post", postRoute);

//auth route
app.use("/auth", authRouter);

//404 response
app.use((error: any, res: Response, next: NextFunction) => {
    try {
        res.status(404).send("Resource not found");
    } catch (error) {
        next(error);
    }
});

app.use((error: any, res: Response, next: NextFunction) => {
    try {
        const status = error.status || 500;
        const message = error.message || "There was an error while processing your request, please try again";
        return res.status(status).send({
            status,
            message
        });
    } catch (error) {
        next(error);
    }
});

connectDB(MONGO_URL);

export default app;

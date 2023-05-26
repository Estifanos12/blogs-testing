import mongoose from "mongoose";

/**
 * connect to the db with connection string as param
 */

export const connectDB = async (uri: string): Promise<void> => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
    } finally {
        mongoose.connection.on("disconnected", () => {});

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit();
        });
    }
};

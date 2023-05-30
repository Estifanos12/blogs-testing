import * as dotenv from "dotenv";
dotenv.config();

if (!(process.env.MONGO_URL && process.env.JWT_SECRET)) {
  throw new Error("create .env file with MONGO_URL and JWT_SECRET keys");
}

export const { MONGO_URL, JWT_SECRET } = process.env;

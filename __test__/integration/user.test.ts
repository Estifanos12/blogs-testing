import request from "supertest";

import app from "../../src/app";
import mongoose from "mongoose";
import { User } from "../../src/models/user.model";
import { Post } from "../../src/models/post.model";
import { MONGO_URL } from "../../src/config";
let server: any;

beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
    server = app.listen(8080);
    // await User.collection.drop();
    // await Post.collection.drop();
});

afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});

describe("Integration: User /POST Testing", () => {
    describe("when all the values are correct", () => {
        it("should create user if valid data is provided", async () => {
            const data = {
                username: "newuser2",
                name: "Alemu sisay",
                email: "newuser2@gmail.com"
            };

            const result = await request(server).post("/user").send(data);
            expect(result.status).toBe(200);
            expect(result.body._id).toBeDefined();
        }, 60000);

        it("should return 409 if duplicate  exist", async () => {
            const data = {
                username: "abserdtfyguhcdef",
                name: "Alemu sisay",
                email: "abserdtfyuhjic@gmail.com"
            };

            await request(server).post("/user").send(data);
            const result = await request(server).post("/user").send(data);
            expect(result.status).toBe(409);
            expect(result.body.message).toEqual("Username or email already exists");
        }, 60000);
    });

    describe("when one value is missing", () => {
        it("should return 400", async () => {
            const result = await request(server).post("/user").send({
                name: "Alemu sisay3",
                email: "alemu3@gmail.com"
            });
            expect(result.status).toBe(400);
            expect(result.body.message).toEqual("Invalid details provided");
        }, 60000);
    });
});

describe("Integration: User /Get Testing", () => {
    describe("when the users exists", () => {
        it("should return 200", async () => {
            const result = await request(server).get("/user");
            expect(result.status).toBe(200);
        }, 60000);
    });
});

describe("Integration: User /DELETE Testing", () => {
    const userID = "64705473b42f8dcc24179543";
    it("should return 404 if user does not exist", async () => {
        const result = await request(server).get(`/user/${userID}`);
        expect(result.status).toBe(404);
        expect(result.body).toBeDefined();
    }, 60000);
});

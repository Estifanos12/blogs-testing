import request from "supertest";

import app from "../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../src/config";
import authService from "../../src/services/auth.services";
let server: any;

beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
    server = app.listen(8080);
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
                email: "newuser2@gmail.com",
                password: "pass1234"
            };

            const result = await request(server).post("/user").send(data);
            expect(result.status).toBe(200);
            expect(result.body.id).toBeDefined();
        }, 60000);

        it("should return 409 if duplicate  exist", async () => {
            const data = {
                username: "abserdtfyguhcdef",
                name: "Alemu sisay",
                email: "abserdtfyuhjic@gmail.com",
                password: "pass1234"
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
                email: "alemu3@gmail.com",
                password: "pass1234"
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

describe("Integration: /user/me", () => {
    let token: string | undefined;
    beforeAll(async () => {
        await request(app).post("/user").send({
            name: "Jane Doe",
            username: "jane234",
            email: "jane@gmail.com",
            password: "jane1234"
        });
        token = await authService.login("jane@gmail.com", "jane1234");
    });

    it("gets user information if token is provided", async () => {
        request(app)
            .get("/user/me")
            .set("Authorization", `Bearer ${token}`)
            .expect(/200/)
            .expect("Content-Type", /json/)
            .expect(/Jane Doe/);
    });
});

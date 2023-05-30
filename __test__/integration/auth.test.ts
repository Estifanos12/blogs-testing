import request from "supertest";

import app from "../../src/app";
import mock_data from "../mock_data/mock_data";

describe("Integration: POST /auth/login", () => {
    beforeAll(async () => {
        await request(app).post("/user").send(mock_data.userWithCredentials);
    });

    describe("the credentials are correct", () => {
        it("should return token", async () => {
            return request(app).post("/auth/login").send(mock_data.credentials).expect(200).expect(/token/).expect("Content-Type", /json/);
        });
    });

    describe("either password or email is incorrect", () => {
        it("should return a 401 unauthorized status code", async () => {
            await request(app)
                .post("/auth/login")
                .send({
                    email: mock_data.credentials.email,
                    password: "incorrect_pwd"
                })
                .expect(401)
                .expect(/invalid credentials/);

            await request(app)
                .post("/auth/login")
                .send({
                    password: mock_data.credentials.password,
                    email: "incorrect_email@gmail.com"
                })
                .expect(401)
                .expect(/invalid credentials/);
        });
    });

    describe("email credential not present", () => {
        it("should return a 400 bad request status code", async () => {
            return request(app).post("/auth/login").send({ password: mock_data.credentials.password }).expect(400).expect(/error/).expect(/email/);
        });
    });

    describe("password credential not present", () => {
        it("should return a 400 bad request status code", async () => {
            return request(app)
                .post("/auth/login")
                .send({ email: mock_data.credentials.email })
                .expect(400)
                .expect(/error/)
                .expect(/password/);
        });
    });

    describe("email credential not valid format", () => {
        it("should return a 400 bad request status code", async () => {
            return request(app)
                .post("/auth/login")
                .send({
                    password: mock_data.credentials.password,
                    email: "johngmail.com"
                })
                .expect(400)
                .expect(/error/)
                .expect(/email/);
        });
    });
});

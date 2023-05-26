import "jest";
import request, { Response } from "supertest";

import app from "../../src/app";

let server: any;

beforeAll(async () => {
    server = app.listen(8081);
});

afterAll(async () => {
    server.close();
});

describe("Server", () => {
    describe("Get / Request not found handler", () => {
        it("should respond with a 404 status code ", () => {
            request(server).get("/endpoint-does-not-exist").expect("Content-Type", /json/).expect(404);
        });
    });

    describe("Get / Request success handler", () => {
        it("should respond with 200 status code", () => {
            request(server).get("/post").expect(200);
        });
    });
});

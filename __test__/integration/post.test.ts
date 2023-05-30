import request from "supertest";

import app from "../../src/app";
import { User } from "../../src/models/user.model";
import { Post } from "../../src/models/post.model";

beforeAll(async () => {
    await User.collection.drop();
    await Post.collection.drop();
});

describe("Integration: Post /POST Testing", () => {
    describe("when all the values are correct", () => {
        it("should return 200", async () => {
            const result = await request(app).post("/post").send({
                title: "aabcdegffa",
                description: "anjfhadhjadjhf",
                vote: 5,
                author: "646ca147a83e24d475fbf660"
            });
            expect(result.status).toBe(200);
            expect(result.body.id).toBeDefined();
        }, 60000);
    });

    describe("when request values are not correct", () => {
        it("should return status 400", async () => {
            const result = await request(app).post("/post").send({
                desciption: "some desc",
                vote: 5,
                author: "Eyuel Ketema"
            });
            expect(result.status).toBe(400);
            expect(result.body.message).toEqual("Invalid details provided");
        }, 60000);
    });
});

describe("Integration: Post /Get Testing", () => {
    describe("when there are posts ", () => {
        it("should return 200", async () => {
            const result = await request(app).get("/post");
            expect(result.status).toBe(200);
        }, 60000);
    });

    describe("when there are no posts ", () => {
        it("should return 404", async () => {
            const result = await request(app).get("/post/64705c9937fa0f962dbf1524");
            expect(result.status).toBe(404);
            expect(result.body.message).toEqual("Post not found");
        }, 60000);
    });
});

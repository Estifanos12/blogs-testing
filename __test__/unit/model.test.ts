import mongoose from "mongoose";

import { Post } from "../../src/models/post.model";
import { User } from "../../src/models/user.model";
import { MONGO_URL } from "../../src/config";

beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

const correctUserMockData = {
    username: "someusername1234",
    name: "some name",
    email: "someemail1234@gmail.com"
};

const requiredMissingUserMockData = {
    username: "username123",
    name: "some namenew"
};

const correctPostMockData = {
    title: "aabcdegffa",
    description: "anjfhadhjadjhf",
    vote: 5,
    author: "646ca147a83e24d475fbf660"
};

const inCorrectPostMockData = {
    title: "aabcdegffa",
    description: "anjfhadhjadjhf",
    vote: 5,
    author: "incorrectID"
};
describe("Testing models", () => {
    describe("Testing User Model", () => {
        it("should create & save user successfully", async () => {
            const newUser = new User(correctUserMockData);
            const savedUser = await newUser.save();
            expect(savedUser._id).toBeDefined();
            expect(savedUser.username).toBe(correctUserMockData.username);
            expect(savedUser.name).toBe(correctUserMockData.name);
            expect(savedUser.email).toBe(correctUserMockData.email);
        }, 60000);

        it("should throw an error due to missing requied fields", async () => {
            const newUser = new User(requiredMissingUserMockData);
            let err;
            try {
                const savedUserWithoutRequiredField = await newUser.save();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        }, 60000);
    });

    describe("Testing Post Model", () => {
        it("Should create and save post if user exists", async () => {
            const newPost = new Post(correctPostMockData);
            const savedPost = await newPost.save();
            expect(savedPost._id).toBeDefined();
            expect(savedPost.title).toBe(correctPostMockData.title);
            expect(savedPost.description).toBe(correctPostMockData.description);
            expect(savedPost.vote).toBe(correctPostMockData.vote);
        }, 60000);

        it("should throw an error due to invalid user id", async () => {
            const newPost = new User(inCorrectPostMockData);
            let err;
            try {
                const userDoesNotExist = await newPost.save();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        }, 60000);
    });
});

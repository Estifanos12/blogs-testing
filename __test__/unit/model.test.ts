import mongoose from "mongoose";

import { Post } from "../../src/models/post.model";
import { User } from "../../src/models/user.model";
import { MONGO_URL } from "../../src/config";
import mock_data from "../mock_data/mock_data";

beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Testing models", () => {
    describe("Testing User Model", () => {
        it("should create & save user successfully", async () => {
            const newUser = new User(mock_data.correctUserMockData);
            const savedUser = await newUser.save();
            expect(savedUser._id).toBeDefined();
            expect(savedUser.username).toBe(mock_data.correctUserMockData.username);
            expect(savedUser.name).toBe(mock_data.correctUserMockData.name);
            expect(savedUser.email).toBe(mock_data.correctUserMockData.email);
        }, 60000);

        it("should throw an error due to missing requied fields", async () => {
            const newUser = new User(mock_data.requiredMissingUserMockData);
            let err;
            try {
                await newUser.save();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        }, 60000);
    });

    describe("Testing Post Model", () => {
        it("Should create and save post if user exists", async () => {
            const newPost = new Post(mock_data.correctPostMockData);
            const savedPost = await newPost.save();
            expect(savedPost._id).toBeDefined();
            expect(savedPost.title).toBe(mock_data.correctPostMockData.title);
            expect(savedPost.description).toBe(mock_data.correctPostMockData.description);
            expect(savedPost.vote).toBe(mock_data.correctPostMockData.vote);
        }, 60000);

        it("should throw an error due to invalid user id", async () => {
            const newPost = new User(mock_data.invalidIdPostMockData);
            let err;
            try {
                await newPost.save();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        }, 60000);
    });
});

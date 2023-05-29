import { validatePostRequest } from "../../src/validation/post.validation";
import { validateUserRequest } from "../../src/validation/user.validation";
import mock_data from "../mock_data/mock_data";

describe("Post request validation", () => {
    describe("author field is empty", () => {
        it("should return error message", async () => {
            expect(await validatePostRequest(mock_data.mockPostData)).toEqual({ message: '"author" is not allowed to be empty' });
        });

        describe("vote field is not a number", () => {
            it("should return error message", async () => {
                expect(await validatePostRequest(mock_data.mockPostData2)).toEqual({ message: '"vote" must be a number' });
            });
        });
    });
});

describe("User request validation", () => {
    describe("username is less than 6 characters", () => {
        it("should return error message", async () => {
            expect(await validateUserRequest(mock_data.mockUserData)).toEqual({ message: '"username" length must be at least 6 characters long' });
        });

        describe("if the email is valid", () => {
            it("should return success message", async () => {
                expect(await validateUserRequest(mock_data.mockUserData2)).toEqual({ message: "Success" });
            });
        });
    });
});

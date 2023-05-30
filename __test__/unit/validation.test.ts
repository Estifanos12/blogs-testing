import { ValidationError } from "joi";

import { validatePostRequest } from "../../src/validation/post.validation";
import { validateUserRequest } from "../../src/validation/user.validation";
import { validateAuthUserRequest } from "../../src/validation/auth.validation";
import mock_data from "../mock_data/mock_data";

describe("Post request validation", () => {
    describe("author field is empty", () => {
        it("should return error message", () => {
            expect(validatePostRequest(mock_data.mockPostData)).toBeInstanceOf(ValidationError);
        });

        describe("vote field is not a number", () => {
            it("should return error message", () => {
                expect(validatePostRequest(mock_data.mockPostData2)).toBeInstanceOf(ValidationError);
            });
        });
    });
});

describe("User request validation", () => {
    describe("username is less than 6 characters", () => {
        it("should return error message", () => {
            expect(validateUserRequest(mock_data.mockUserData)).toBeInstanceOf(ValidationError);
        });
    });

    describe("the email is valid", () => {
        it("should return success message", () => {
            expect(validateUserRequest(mock_data.mockUserData2)).toEqual({ message: "Success" });
        });
    });
});

describe("User auth validation", () => {
    describe("email not valid format", () => {
        it("should return error message", () => {
            expect(validateAuthUserRequest(mock_data.invalidEmailFormat)).toBeInstanceOf(ValidationError);
        });
    });
});

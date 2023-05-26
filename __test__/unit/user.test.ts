import { validateUserRequest } from "../../src/validation/user.validation";

describe("User", () => {
    const mockData = {
        username: "alemu",
        name: "Eyuel ketema",
        email: "e@gmail.com"
    };

    const mockData2 = {
        username: "alemusisay",
        name: "Eyuel ketema",
        email: "e@gmail.com"
    };

    it("username is less than 6 characters", async () => {
        expect(await validateUserRequest(mockData)).toEqual({ message: '"username" length must be at least 6 characters long' });
    });

    it("email should be valid format", async () => {
        expect(await validateUserRequest(mockData2)).toEqual({ message: "Success" });
    });
});

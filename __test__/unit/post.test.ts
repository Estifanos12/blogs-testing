import { validatePostRequest } from "../../src/validation/post.validation";

describe("Posts", () => {
    const mockData = {
        title: "Eyuel Ketema",
        description: "some description about eyu ketema",
        vote: 6,
        author: ""
    };

    const mockData2 = {
        title: "Eyuel Ketema",
        description: "some description about eyu ketema",
        vote: "6",
        author: "Estifanos Gashawtena"
    };

    describe("should validate incoming request post data", () => {
        it("author is empty", async () => {
            expect(await validatePostRequest(mockData)).toEqual({ message: '"author" is not allowed to be empty' });
        });

        it("vote is not a number", async () => {
            expect(await validatePostRequest(mockData2)).toEqual({ message: '"vote" must be a number' });
        });
    });
});

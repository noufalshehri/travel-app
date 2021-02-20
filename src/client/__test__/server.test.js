import 'babel-polyfill'
const request = require("supertest");
const app = require("../../server/index");

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    test("test error for wrong path", async () => {
        const response = await request(app).get("/nouf");
        expect(response.statusCode).toBe(404);
    });
});


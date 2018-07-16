const request = require("supertest");
const app = require("../app");

test("Get return Hello World ", async () => {
  const response = await request(app).get("/");
  expect(response.body).toEqual("hello world");
});

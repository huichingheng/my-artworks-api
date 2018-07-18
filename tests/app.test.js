const request = require("supertest");
const app = require("../app");
// let artworks = require("../seedData");
// const mongoose = require("mongoose");
// const { MongoMemoryServer } = require("mongodb-memory-server");
// const mongod = new MongoMemoryServer();

test("GET / should return a string ", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("use /artworks as endpoint");
});

const request = require("supertest");
// const app = require("../app");
// let artworks = require("../seedData");
const artworksRouter = require("../routers/artworks");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const Artwork = require("../models/artwork");
const express = require("express");
const dummyApp = express();

artworksRouter(dummyApp);

let saveArtwork1;

async function addFakeArtworks() {
  const artwork1 = new Artwork({
    artwork: "artpiece",
    artist: "hc",
    type: "watercolor",
    subject: "some subject",
    surface: "paper",
    size: "23x50 cm",
    description: "some description",
    price: 150,
    image_url: "some url"
  });

  saveArtwork1 = await artwork1.save();
}

beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  await addFakeArtworks();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test("GET /artworks by artist name, if artist never exist return []", async () => {
  const response = await request(dummyApp)
    .get("/artworks")
    .query({ artist: "non-existent artist" });
  expect(response.status).toEqual(200);

  const isThisAnArray = Array.isArray(response.body);
  expect(isThisAnArray).toEqual(true);

  expect(response.body.length).toEqual(0);
});

test("POST / should return the length of the artworks after create the new artwork", async () => {
  const newArtwork = {
    artwork: "my artwork",
    artist: "m singh",
    type: "acrylic",
    size: "48x48 inch",
    description: "some description",
    price: 1866.67
  };

  const response = await request(dummyApp)
    .post("/artworks")
    .send(newArtwork);
  expect(response.status).toBe(201);
  const artworks = await Artwork.find();
  expect(artworks.length).toEqual(2);
});

test("PUT /:id should return the updated artwork", async () => {
  const updateArtwork = {
    price: 2000
  };
  const response = await request(dummyApp)
    .put("/artworks/" + saveArtwork1._id)
    .send(updateArtwork);
  const updatedArtwork = await Artwork.findById(saveArtwork1._id);
  expect(response.status).toBe(204);
  expect(updatedArtwork.price).toEqual(updateArtwork.price);
});

test("DEL / should return the deleted artwork id", async () => {
  const response = await request(dummyApp).delete(
    "/artworks/" + saveArtwork1._id
  );
  const delArtwork = await Artwork.findById(saveArtwork1._id);

  expect(response.status).toBe(204);
  expect(delArtwork).toBeNull;
});

const request = require("supertest");
const app = require("../app");
const artworks = require("../seedData");

test("GET / should return a string ", async () => {
  const response = await request(app).get("/");
  expect(response.body).toEqual("use /artworks as endpoint");
});

test("GET / should return non-empty array", async () => {
  const response = await request(app).get("/artworks");
  const isThisAnArray = Array.isArray(response.body);
  expect(isThisAnArray).toEqual(true);
  expect(response.body.length).toBeGreaterThan(0);
});

test("GET / should return the specific id artwork", async () => {
  const response = await request(app).get("/artworks/2");
  expect(response.body).toEqual(artworks[1]);
});

test("POST / should return the new Artwork list", async () => {
  const newArtwork = {
    id: "6",
    artist: "m singh",
    type: "acrylic",
    size: "48x48 inch",
    price: 1866.67
  };
  const response = await request(app)
    .post("/artworks")
    .send(newArtwork);

  expect(response.body).toEqual([...artworks, newArtwork]);
});

test("PUT / should return the updated artwork", async () => {
  const updatedArtwork = {
    price: 2000
  };
  const response = await request(app)
    .put("/artworks/1")
    .send(updatedArtwork);

  expect(response.body).toMatchObject(updatedArtwork);
});

test("DEL / should return the deleted artwork id", async () => {
  const ID = 2;
  const response = await request(app).delete(`/artworks/${ID}`);
  expect(response.body).toEqual(`the artwork id-${ID} is removed`);
});

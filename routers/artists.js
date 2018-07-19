const express = require("express");
const artistsRouter = express.Router();
const Artist = require("../models/artist");
const Artwork = require("../models/artwork");

artistsRouter.use(express.json());

artistsRouter.post("/", async (req, res, next) => {
  const newArtist = new Artist({
    name: req.body.name,
    email: req.body.email
  });
  await newArtist.save();

  res.status(201).json({
    message: "sucessful create artist"
  });
});



module.exports = app => {
  app.use("/artists", artistsRouter);
};

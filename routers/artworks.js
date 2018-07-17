const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// let artworks = require("../seedData");
const Artwork = require("../models/artwork");

// router.use(express.json());

router.get("/", (req, res) => {
  res.json(artworks);
});

router.get("/:id", (req, res) => {
  let artwork = artworks.find(artwork => artwork.id === req.params.id);
  const err = new Error("simluated error");
  if (artwork) {
    res.json(artwork);
  } else {
    next();
  }
});

router.post("/", async (req, res, next) => {
  const newArtwork = new Artwork({
    artwork: req.body.artwork,
    artist: req.body.artist,
    type: req.body.type,
    subject: req.body.subject,
    surface: req.body.surface,
    size: req.body.size,
    description: req.body.description,
    price: req.body.price,
    image_url: req.body.image_url
  });

  const result = await newArtwork.save();
  // console.log(result);
  res.status(201).json();
});

// router.post("/", (req, res) => {
//   const addArtworks = [...artworks, req.body];
//   res.json(addArtworks);
// });

router.put("/:id", (req, res) => {
  let newArtworksList = artworks.map(artwork => {
    if (artwork.id === req.params.id) {
      return { ...artwork, ...req.body };
    } else return artwork;
  });
  artworks = newArtworksList;
  // console.log(newArtworksList);
  res.json(
    artworks.find(artwork => {
      return artwork.id === req.params.id;
    })
  );
});

router.delete("/:id", (req, res) => {
  artworks = artworks.filter(artwork => artwork.id !== req.params.id);
  res.json(`the artwork id-${req.params.id} is removed`);
});

module.exports = router;

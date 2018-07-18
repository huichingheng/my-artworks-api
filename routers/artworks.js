const express = require("express");
const artworksRouter = express.Router();
const mongoose = require("mongoose");
const Artwork = require("../models/artwork");

artworksRouter.use(express.json());

artworksRouter.get("/", async (req, res, next) => {
  const artworks = await Artwork.find();
  // console.log("SAIDHASIFGHAIFHAIGA", req.query)

  const queryKeys = Object.keys(req.query)
  
  if (queryKeys.length > 0) {
    const requestedArtist = req.query.artist;
    
    const filteredArtworks = artworks.filter(artwork => {
      return artwork.artist.includes(requestedArtist);
    });
    res.json(filteredArtworks);
  } else {
    res.json(artworks);
  }
});

artworksRouter.post("/", async (req, res, next) => {
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

artworksRouter.put("/:id", async (req, res, next)=>{
  const artwork = await Artwork.findByIdAndUpdate(req.params.id,req.body)
  res.status(204).json()
})


artworksRouter.delete("/:id", async (req, res, next) => {
  const artwork = await Artwork.findByIdAndDelete(req.params.id);
  res.status(204).json(`the artwork id-${req.params.id} is removed`);
});

module.exports = (app)=>{app.use("/artworks", artworksRouter)};

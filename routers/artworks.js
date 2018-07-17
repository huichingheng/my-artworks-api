const express = require("express");
const router = express.Router();
let artworks = require("../seedData");

// router.use(express.json());

router.get("/", (req, res) => {
  res.json(artworks);
});

router.get("/:id", (req, res) => {
  let artwork = artworks.find(artwork => artwork.id === req.params.id);
  res.json(artwork);
});

router.post("/", (req, res) => {
  const addArtworks = [...artworks, req.body];
  res.json(addArtworks);
});

router.put("/:id", (req, res) => {
  let newArtworksList = artworks.map(artwork => {
    if (artwork.id === req.params.id) {
      return { ...artwork, ...req.body };
    } else return artwork;
  });
  artworks = newArtworksList;
  console.log(newArtworksList);
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

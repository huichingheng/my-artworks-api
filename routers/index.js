const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("use /artworks as endpoint");
});

module.exports = router;

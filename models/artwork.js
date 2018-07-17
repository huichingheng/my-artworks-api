const mongoose = require("mongoose");

const artworkSchema = mongoose.Schema({
  artwork: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    require: true
  },
  type: String,
  subject: String,
  surface: String,
  size: {
    type: String,
    require: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  image_url: String
});

module.exports = mongoose.model("Artwork", artworkSchema);

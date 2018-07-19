const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model("Artist", artistSchema);

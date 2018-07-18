const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  name: String,
  email: String,
  bank_account: Number
});

module.exports = mongoose.model("Artist", artistSchema);

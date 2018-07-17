const mongoose = require("mongoose");
const express = require("express");
const app = express();
const index = require("./routers/index");
const artworks = require("./routers/artworks");

const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost/artworks";

mongoose.connect(mongodbURI);
const db = mongoose.connection;
db.on("error", error => {
  console.log("An error occur", error);
});

app.use(express.json());

app.use("/", index);
app.use("/artworks", artworks);

app.use(function(req, res, next) {
  res.status(404).json("Sorry can't find it");
});

app.use(function(err, req, res, next) {
  res.status(500).json("My Bad! Try again later.");
});

module.exports = app;

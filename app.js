const mongoose = require("mongoose");
const express = require("express");
const app = express();
const index = require("./routers/index");
const artworksRouter = require("./routers/artworks");
const { passport } = require("./config/passport");

const { handle404, handle500 } = require('./middleware/error_handlers.js');

const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/artworks";

mongoose.connect(
  mongodbURI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", error => {
  console.log("An error occur", error);
});

app.use(express.json());
app.use(passport.initialize());

app.use("/", index);
app.use(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  artworksRouter
);

app.use(handle404, handle500)

// app.use("/artworks", artworksRouter);
artworksRouter(app)

// app.use(function(req, res, next) {
//   res.status(404).json("Sorry can't find it");
// });

// app.use(function(err, req, res, next) {
//   res.status(500).json("My Bad! Try again later.");
// });

module.exports = app;

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const index = require("./routers/index");
const artworksRouter = require("./routers/artworks");
const { passport } = require("./config/passport");
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const { handle404, handle500 } = require("./middleware/error_handlers.js");

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

// app.use("/artworks", artworksRouter);
artworksRouter(app);

app.use(handle404, handle500);


module.exports = app;

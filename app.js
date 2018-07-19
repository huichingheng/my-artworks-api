const mongoose = require("mongoose");
const express = require("express");
const app = express();
const index = require("./routers/index");
const artworksRouter = require("./routers/artworks");
const { passport } = require("./config/passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerDocumentation.json");

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  artworksRouter
);

artworksRouter(app);

app.use(handle404, handle500);

module.exports = app;

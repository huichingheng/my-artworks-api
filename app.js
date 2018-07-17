const express = require("express");
const app = express();
const index = require("./routers/index");
const artworks = require("./routers/artworks")

app.use(express.json());

app.use("/", index);
app.use("/artworks", artworks)


module.exports = app;

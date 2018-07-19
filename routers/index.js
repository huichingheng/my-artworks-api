const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/passport");

router.use(express.json());

router.get("/", (req, res) => {
  res.json("use /artworks as endpoint");
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, bio: "some bio" });
  user.setHashedPassword(password);
  try {
    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (user.validatePassword(password)) {
    const userId = { id: user.id, anything: "whatever" };
    const token = jwt.sign(userId, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

module.exports = router;

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/passport");


const landingPage = (req, res) => {
    res.json("use /artworks as endpoint");
}

const signUp = async (req, res, next) => {
    const { username, password } = req.body;
    const user = new User({ username, bio: "some bio" });
    user.setHashedPassword(password);
    try {
      await user.save();
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

const signIn = async (req, res) => {
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
  }

module.exports = {
    landingPage,
    signUp,
    signIn
}
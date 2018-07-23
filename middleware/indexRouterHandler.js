const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/passport");
const {userIsValid} = require('../middleware/indexSignUpUtility')


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

    const userNotFound = () => {
        res.status(401).json({ message: "no such user found" });
    }

    const userIsNotValid = () => {
        res.status(401).json({ message: "passwords did not match" });
    }

    if (!user) {
        userNotFound()
    }

    if (user.validatePassword(password)) {
        userIsValid(user, jwt, jwtOptions, res)
    } else {
        userIsNotValid()
    }
}

module.exports = {
    landingPage,
    signUp,
    signIn
}
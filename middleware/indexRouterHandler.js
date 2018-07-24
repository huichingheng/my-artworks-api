const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/passport");
const {userIsValid, userNotFound} = require('../middleware/indexSignUpUtility')


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

    if (!user) {userNotFound(res)}

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
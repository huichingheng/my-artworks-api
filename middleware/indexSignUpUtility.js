const userIsValid = (user, jwt, jwtOptions, res) => {
    const userId = { id: user.id, anything: "whatever" };
    const token = jwt.sign(userId, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
}

const userNotFound = (res) => {
    res.status(401).json({ message: "no such user found" });
}

const userIsNotValid = (res) => {
    res.status(401).json({ message: "passwords did not match" });
}

module.exports = {
    userIsValid,
    userNotFound,
    userIsNotValid
}
const userIsValid = (user, jwt, jwtOptions, res) => {
    const userId = { id: user.id, anything: "whatever" };
    const token = jwt.sign(userId, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
}

module.exports = {
    userIsValid
}
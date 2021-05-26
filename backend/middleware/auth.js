const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let jwtTk = req.header("Authorization");
    if(!jwtTk) return res.status(400).send("Rejected authorization: there is no token");
    jwtTk = jwtTk.split(" ")[1];
    if(!jwtTk) return res.status(400).send("Rejected authorization: there is no token");
    try {
        const payload = jwt.verify(jwtTk, "secret");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send("Rejected authorization: invalid token");
    }
};

module.exports = auth;
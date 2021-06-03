const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let jwtTk = req.header("Authorization");
    message(jwtTk);
    jwtTk = jwtTk.split(" ")[1];
    message(jwtTk);
    try {
        const payload = jwt.verify(jwtTk, process.env.secretKey);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send("Rejected authorization: invalid token");
    }
};

const message = (jwtTk) => {
    if(!jwtTk) return res.status(400).send("Rejected authorization: there is no token");
};

module.exports = auth;
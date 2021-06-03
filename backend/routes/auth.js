const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  message(user);
  const hash = await bcrypt.compare(req.body.password, user.password);
  message(hash);
  try {
    const jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (error) {
    return res.status(400).send("Login error", error);
  }
});

const message = (info) => {
  if (!info) return res.status(400).send("Invalid login info");
};

module.exports = router;

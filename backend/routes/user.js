const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
const Role = require("../models/role");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Admin = require("../middleware/admin");

router.post("/userRegistration", async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.name)
    return res.status(400).send("Please fill all the blanks");

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("The user already exists");
  }

  const role = await Role.findOne({ name: "user" });
  if (!role) {
    return res.status(400).send("Process failed: No role was assigned");
  }

  const hash = await bcrypt.hash(req.body.password, 20);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    status: true,
  });

  const result = await user.save();
  if (result) {
    const jwt = user.generateJWT();
    res.status(200).send({ jwt });
  } else {
    return res.status(200).send("Couldn't register user");
  }
});

router.get("/listUsers/:name?", Auth, UserAuth, Admin, async (req, res) => {
  const users = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if (!users) {
    return res.status(400).send("No users found");
  } else {
    return res.status(200).send({ users });
  }
});

router.post("/adminRegistration", Auth, UserAuth, Admin, async (req, res) => {
  let blanks = req.body;
  if (!blanks.name || !blanks.email || !blanks.password || !blanks.roleId) {
    return res.status(400).send("Incomplete data");
  }

  const id = mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!id) {
    return res.status(400).send("Invalid id");
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("The user already exists");
  }

  const hash = await bcrypt.hash(req.body.password, 20);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    status: true,
  });

  try {
    const result = await user.save();
    if (!result) {
      return res.status(401).send("Failed to register user");
    }
    const jwtTk = user.generateJWT();
    res.status(200).send({ jwtTk });
  } catch (error) {
    return res.status(400).send("Failed to register user");
  }
});

router.put("/userUpdate", Auth, UserAuth, Admin, async (req, res) => {
  let blanks = req.body;
  if (
    !blanks._id ||
    !blanks.name ||
    !blanks.email ||
    !blanks.password ||
    !blanks.roleId
  ) {
    return res.status(400).send("Incomplete data");
  }

  const hash = await bcrypt.hash(req.body.password, 20);

  const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role.body._id,
    status: req.body.status,
  });

  if (!user) {
    return res.status(401).send("COuldn't edit user");
  } else {
    return res.status(200).send({ user });
  }
});

router.delete("deleteUser/:id", Auth, UserAuth, Admin, async (req, res) => {
  const id = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!id) {
    return res.status(400).send("Invalid id");
  }

  const user = await User.findByIdAndDelete(req.params._id);
  if (!user) {
    return res.status(400).send("Couldn't delete user");
  } else {
    return res.status(200).send("The user has been deleted");
  }
});

router.put("/deleteUser", Auth, UserAuth, Admin, async (req, res) => {
  let blanks = req.body;
  if (
    !blanks._id ||
    !blanks.name ||
    !blanks.email ||
    !blanks.password ||
    !blanks.roleId
  ) {
    return res.status(400).send("Incomplete data");
  }

  const hash = await bcrypt.hash(req.body.password, 20);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    status: true,
  });

  if (!user) {
    return res.status(400).send("Couldn't delete user");
  } else {
    return res.status(200).send("The user has been deleted");
  }
});

module.exports = router;

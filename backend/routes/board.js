const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");
const User = require("../models/user");
const Board = require("../models/board");

router.post("/newTask", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).semd("User not authenticated");

    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do"
    });
    const result = await board.save();
    return res.status(200).send({result});
});

router.get("/taskList", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send("The user does not exist on DB");
    const board = await Board.find({userId: user._id});
    return res.status(200).send({board})
});

module.exports = router;
const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");
const User = require("../models/user");
const Board = require("../models/board");

router.post("/newTask", Auth, async(req, res) => {
    const user = await validate(req);
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
    const user = await validate(req);
    const board = await Board.find({userId: user._id});
    return res.status(200).send({board})
});

router.put("/updateTask", Auth, async(req, res) => {
    const user = await validate(req);
    const board = await Board.findByIdAndUpdate(req.body._id,{
        userId: user._id,
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
    });
    if(!board) res.status(400).send("Couldn't edit activity");
    return res.status(200).send({board});
});

router.delete("/:_id", Auth, async(req, res) => {
    await validate(req);
    const board = await Board.findByIdAndDelete(req.params._id);
    if (!board) return res.status(401).send("The task does not exist");
    return res.status(200).send("Task deleted");
});

const validate = (req) => {
    const user = User.findById(req.user._id);
    if(!user) return res.status(400).send("User not authenticated");
    return user;
};

module.exports = router;
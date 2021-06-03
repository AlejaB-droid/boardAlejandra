const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");
const Board = require("../models/board");


router.post("/newTaskImg", Upload.single("image"), UserAuth, Auth, async(req, res) => {
    if(!req.body.name || !req.body.description){return res. status(400).send("Please fill all the blanks")}
    let img = req.file;
    if(img){
        if(img.mimetype !== "image/jpg" && img.mimetype !== "image/jpeg")
    }
});

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


module.exports = router;
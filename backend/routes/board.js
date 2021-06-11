const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multipart = require("connect-multiparty");
const mult = multipart();
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");
const Board = require("../models/board");


router.post("/newTask", mult, Upload, Auth, UserAuth, async(req, res) => {
    if(!req.body.name || !req.body.description){
        return res. status(400).send("Please fill all the blanks");
    };

    let img = "";
    if(req.files !== undefined && req.files.image.type){
        const url = req.protocol + "://" + req.get("host") + "/";
        let serverImage = "./uploads/" + moment().unix() + path.extname(req.files.image.path);
        fs.createReadStream(req.files.image.path).pipe(fs.createWriteStream(serverImage));
        img = url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
    }

    const board = new Board({
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do",
        image: img
    });

    const result = await board.save();
    if(!result){
        return res.status(400).send("Failed to upload task");
    }else{
        return res.status(200).send({result});
    }
    
});

router.get("/taskList", Auth, UserAuth, async(req, res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if(!validId) {return res.status(400).send("Invalid id")};

    const board = await Board.find({userId: req.user._id});
    if(!board) {
        return res.status(400).send("There are no tasks to delete");
    }else{
    return res.status(200).send({board})
    };
});

router.put("/updateTask", Auth, UserAuth, async(req, res) => {
    let blanks = req.body;
    if(!blanks._id || !blanks.name || !blanks.status || !blanks.description){
        return res.status(400).send("Incomplete data")
    };

    const id = mongoose.Types.ObjectId.isValid(req.body._id);
    if(!id){return rex.status(400).send("Invalid id")};

    const board = await Board.findByIdAndUpdate(req.body._id,{
        userId: req.user._id,
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
    });

    if(!board) {res.status(400).send("Couldn't edit activity")};
    return res.status(200).send({board});
});

router.delete("/deleteTask/:_id", Auth, UserAuth, async(req, res) => {
    const id = mongoose.Types.ObjectId.isValid(req.params._id);
    if(!id) {return res.status(400).send("Invalid id")};
    
    const board = await Board.findByIdAndDelete(req.params._id);
    if (!board) return res.status(401).send("The task does not exist");
    return res.status(200).send("Task deleted");
});


module.exports = router;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/userRegistration", async(req, res) => {
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send("The user already exists");
    const hash = await bcrypt.hash(req.body.password, 20)
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })
    const result = await user.save();
    if (result){
        const jwt = user.generateJWT()
        res.status(200).send({jwt})
    } else{
        return res.status(200).send("Couldn't register user");
    }
});

module.exports = router;
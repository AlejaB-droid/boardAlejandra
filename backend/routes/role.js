const express = require("express");
const router = express.Router();

const Role = require("../models/role");
const Admin = require("../middleware/admin");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

router.post("/roleRegistration", Auth, UserAuth, Admin, async(req,res) => {
    if(!req.body.name || !req.body.description){
        return res.status(400).send("Please fill all the blanks");
    };

    const roleCheck = await Role.findOne({name: req.body.name});
    if(roleCheck){
        return res.status(400).send("The role already exists");
    };

    const role = new Role({
        name: req.body.name,
        description: req.body.description,
        status: true
    });

    const result = await role.save();
    if(!result){
        return res.status(400).send("Couldn't register role");
    }else{
        return res.status(200).send({result})
    };
});

router.get("/roleList", Auth, Admin, UserAuth, async(req, res) => {
    const role = await Role.find();
    if(!role){
        return res.status(400).send("There are no roles");
    }else{
        return res.status(200).send({role});
    };
});

module.exports = router;
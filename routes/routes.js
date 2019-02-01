const express = require("express");
const router = express.Router();

const User = require('../models/user')

router.get("/", async (req, res, next) => {
    const users = await User.find();
    return res.json({
        users,
    });
})

router.post("/", async (req, res) => {
    console.log(req.body);
    const {
        user,
        stats
    } = req.body;

    const nuser = new User({
        user,
        stats
    });
    await nuser.save();
    res.json({
        "status": "OK"
    })
})

module.exports = router;
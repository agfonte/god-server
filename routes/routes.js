const express = require("express");
const router = express.Router();

const User = require('../models/user')
const Moves = require('../models/moves')


//  Users routes
router.get("/users", async (req, res, next) => {
    const users = await User.find();
    return res.json({
        users,
    });
})

router.post("/users", async (req, res) => {
    const {
        user,
        stats,
        games
    } = req.body;

    const nuser = new User({
        user,
        stats,
        games
    });
    await nuser.save();
    res.json({
        "status": "OK"
    })
})
router.put("/users", async (req, res) => {
    console.log(req.body)
    let id = req.body.id;
    let win = req.body.win;
    let lose = req.body.lose;
    let against = req.body.against;
    await User.findById(id, (err, user) => {
        if (err || user === null) {
            console.log(err);
            res.send({
                "status": "Fail",
                "reason": "No such user"
            });
        };
        let stats = user.stats;
        if (win > lose) {
            stats["win"]++;
            user.set({
                stats
            });
        } else {
            stats["lose"]++;
            user.set({
                stats
            });
        }
        if (against) {
            let games = user.games
            games.push({
                against,
                win,
                lose
            })
        }
    }).catch((err) => console.log(err))
})

router.delete("/users", async (req, res) => {
    let id = req.body.id;
    await User.findOneAndRemove(id).catch((err) => console.err(err));
    return res.json({
        "status": "Ok"
    });
})


// Moves routes
router.get("/moves", async (req, res, next) => {
    const moves = await Moves.find();
    return res.json({
        moves,
    });
})

router.post("/moves", async (req, res) => {
    const {
        move
    } = req.body;
    console.log(move);
    const nmove = new Moves({
        move
    });
    await nmove.save();
    res.json({
        "status": "OK"
    })
})

module.exports = router;
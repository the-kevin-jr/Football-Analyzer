const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Player = require("../models/player").Player;

router.get("/", async function (req, res) {
    const players = await Player.find({});
    const templateVals = {
        model: "players",
        fields: [{ name: 'playerID', type: 'ID', model: 'players' },
        { name: 'name', type: 'prop', model: '' },
        { name: 'position', type: 'prop', model: '' },
        { name: 'shirtNum', type: 'prop', model: '' }]
        ,
        data: players
    };
    res.render('listModel', templateVals);
});

exports.router = router;

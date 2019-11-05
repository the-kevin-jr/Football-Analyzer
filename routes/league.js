const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const League = require("../models/league").League;

router.get("/", async function (req, res) {
    const leagues = await League.find({});
    const templateVals = {
        model: "leagues",
        fields: [{
            name: 'leagueID',
            type: 'ID', model: 'leagues'
        }, {
            name: 'name',
            type: 'prop', model: ''
        }, {
            name: 'abbr',
            type: 'prop', model: ''
        }, {
            name: 'level',
            type: 'prop', model: ''
        }],
        data: leagues
    };
    res.render('listModel', templateVals);
});

exports.router = router;

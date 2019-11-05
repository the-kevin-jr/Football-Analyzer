const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Season = require("../models/season").Season;

router.get("/", async function (req, res) {
    const seasons = await Season.aggregate([
        {
            $lookup:
            {
                from: 'leagues',
                localField: 'leagueID',
                foreignField: 'leagueID',
                as: 'leagueDetails'
            },
        },{
            $project:
            {
                "leagueID": 1,
                "seasonID": 1,
                "name" : 1,
                "leagueDetails": {"$arrayElemAt":["$leagueDetails", 0]},
            },
        },{
            $project:
            {
                "leagueID": 1,
                "seasonID": 1,
                "name" : 1,
                "leagueName": "$leagueDetails.name"
            }
        }
    ]).exec();
    const templateVals = {
        model: "seasons",
        fields: [
        { name: 'seasonID', type: 'ID', model: 'seasons' },
        { name: 'leagueID', type: 'ID', model: 'leagues' },
        { name: 'leagueName', type: 'prop', model: ''},
        { name: 'name', type: 'prop', model: '' }],
        data: seasons
    };
    res.render('listModel', templateVals);
});

exports.router = router;

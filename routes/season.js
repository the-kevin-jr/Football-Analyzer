const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Season = require("../models/season").Season;
const League = require("../models/league").League;
const Team = require("../models/team").Team;


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

router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const season = await Season.findOne({seasonID: req.params.id}).exec();
    const league = await League.findOne({leagueID: season.leagueID}).exec();
    const teams = await Team.find({seasonID: season.seasonID});
    res.render('seasons', {season, league, teams});
});

exports.router = router;

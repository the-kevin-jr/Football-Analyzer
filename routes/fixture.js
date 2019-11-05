const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Fixture = require("../models/fixture").Fixture;

router.get("/", async function (req, res) {
    const fixtures = await Fixture.aggregate([
        {
            $lookup:
            {
                from: 'teams',
                localField: 'team1',
                foreignField: 'teamID',
                as: 'team1Details'
            },
        },{
            $lookup:
            {
                from: 'teams',
                localField: 'team2',
                foreignField: 'teamID',
                as: 'team2Details'
            },
        },{
            $project:
            {
                "fixtureID": 1,
                "seasonID": 1,
                "date":1,
                "team1": 1,
                "team2": 1,
                "team1Details": {"$arrayElemAt":["$team1Details", 0]},
                "team2Details": {"$arrayElemAt":["$team2Details", 0]}
            },
        },{
            $project:
            {
                "seasonID": 1,
                "fixtureID": 1,
                "date":1,
                "team1": 1,
                "team2": 1,
                "team1Name": "$team1Details.name",
                "team2Name": "$team2Details.name"
            }
        }
    ]).exec();
    const templateVals = {
        model: "fixtures",
        fields: [{ name: 'fixtureID', type: 'ID', model: 'fixtures' },
        {name: 'seasonID', type: 'ID', 'model': 'seasons'},
        { name: 'date', type: 'prop', model: '' },
        { name: 'team1', type: 'ID', model: 'teams' },
        { name: 'team1Name', type: 'prop', model: 'teams' },
        { name: 'team2', type: 'ID', model: 'teams' },
        { name: 'team2Name', type: 'prop', model: 'teams' },
    ],
        data: fixtures
    };
    res.render('listModel', templateVals);
});

exports.router = router;

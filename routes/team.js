const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Team = require("../models/team").Team
router.get("/", async function (req, res) {
    const teams = await Team.find({});
    const templateVals = {
        model: "teams",
        fields: [{ name: 'teamID', type: 'ID', model: 'teams' },
        { name: 'name', type: 'prop', model: '' },
        { name: 'shortName', type: 'prop', model: '' },
        { name: 'teamType', type: 'prop', model: '' }],
        data: teams
    };
    res.render('listModel', templateVals);
});

exports.router = router;

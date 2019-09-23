const mongoose = require('mongoose')

var team = new mongoose.Schema({
    teamID: {type: Number, unique: true, required: true, index: true},
    name: {type: String, required: true},
    shortName: String,
    abbr: String,
    teamType: String,
    groundID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground'
    }]
})

const Team = mongoose.model("Team", team);

exports.insertTeam = async function(teamID, name, shortName, abbr, teamType, groundIDs) {
    const newTeam = new Team({
        teamID: teamID,
        name: name,
        shortName: shortName,
        abbr: abbr,
        teamType: teamType,
        groundID: groundIDs
    });
    await newTeam.save();
}

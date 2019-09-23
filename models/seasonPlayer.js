const mongoose = require('mongoose');

var seasonPlayer = new mongoose.Schema({
    SeasonID: {type: mongoose.Schema.Types.ObjectId, ref: "Season", required: true},
    TeamID: {type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true},
    PlayerID: {type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true}
});

const SeasonPlayer = mongoose.model("SeasonPlayer", seasonPlayer);

exports.insertSeasonPlayer = async function(seasonID, teamID, playerID) {
    const newPlayer = new SeasonPlayer({
        SeasonID: seasonID,
        TeamID: teamID,
        PlayerID: playerID
    })
}

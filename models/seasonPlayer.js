const mongoose = require('mongoose');

var seasonPlayer = new mongoose.Schema({
    SeasonID: {type: String},
    playerID: {type: String},
    teamID: { type: String }
});

const SeasonPlayer = mongoose.model("SeasonPlayer", seasonPlayer);

exports.insertSeasonPlayer = async function(seasonID, teamID, playerID) {
    const newPlayer = new SeasonPlayer({
        SeasonID: seasonID,
        TeamID: teamID,
        PlayerID: playerID
    });
    await newPlayer.save();
}

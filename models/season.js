const mongoose = require('mongoose');

const season = new mongoose.Schema({
    seasonID: {type: Number, required: true, index: true, unique: true},
    name: {type: String, required: true},
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }]
});

const Season = mongoose.model("Season", season);

exports.getSeasonById = async function(id) {
    return await Season.findOne({seasonID: id}).exec();
}

exports.insertSeason = async function(seasonID, name, teamIDs) {
    const newSeason = new Season({
        seasonID: seasonID,
        name: name,
        teams: teamIDs
    });
    await newSeason.save();
} 
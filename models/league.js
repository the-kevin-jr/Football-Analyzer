const mongoose = require("mongoose");

const league = new mongoose.Schema({
    Abbr: {type: String},   
    Name: {type: String, required: true},
    Level: {type: String},
    seasons: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}]
});

const League = mongoose.model("League", league);

exports.insertLeague = async function (abbr, name, level) {
    const newLeague = new League({
        abbr: abbr,
        name: name,
        level: level
    });
    await newLeague.save();
}

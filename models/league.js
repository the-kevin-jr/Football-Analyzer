const mongoose = require("mongoose");

const league = new mongoose.Schema({
  leagueID: { type: Number, required: true, unique: true, index: true },
  abbr: { type: String },
  name: { type: String, required: true },
  level: { type: String },
  seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Season" }]
});

const League = mongoose.model("League", league);

exports.League = League;
exports.insertAndUpdateLeague = async function(id, abbr, name, level, seasons) {
  const newLeague = {
    leagueID: id,
    abbr: abbr,
    name: name,
    level: level,
    seasons: seasons
  };

  return await League.findOneAndUpdate({ leagueID: id }, newLeague, {
    upsert: true,
    new: true
  });
};

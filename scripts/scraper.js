const rp = require("request-promise");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("../models");

COMPETITIONS_URL =
  "https://footballapi.pulselive.com/football/competitions?page=0&pageSize=100&detail=2";

async function main() {
  await db.connect(process.env.DB_HOST);

  const comps = await rp({
    uri: COMPETITIONS_URL,
    json: true
  });

  //   await Promise.all(
  //     comps.content.map(function(comp) {
  //       return Promise.all(
  //         comp.compSeasons.map(function(season) {
  //           return db.season.insertAndUpdateSeason(season.id, season.label, []);
  //         })
  //       ).then(function(seasons) {
  //         return db.league.insertAndUpdateLeague(
  //           comp.id,
  //           comp.abbreviation,
  //           comp.description,
  //           comp.level,
  //           seasons
  //         );
  //       });
  //     })
  //   );

  //Clear database
  await Promise.all([
      db.league.League.deleteMany({}).exec(),
      db.season.Season.deleteMany({}).exec(),
      db.team.Team.deleteMany({}).exec()
    ]);

  //Insert leagues and seasons
  const seasons = [];
  const leagueDocs = comps.content.map(function(comp) {
    const leagueSeasons = comp.compSeasons.map(function(season) {
      const id = mongoose.Types.ObjectId();
      seasons.push({
        _id: id,
        seasonID: season.id,
        name: season.label,
        teams: []
      });
      return id;
    });

    return {
      _id: mongoose.Types.ObjectId(),
      leagueID: comp.id,
      abbr: comp.abbreviation,
      name: comp.description,
      level: comp.level,
      seasons: leagueSeasons
    };
  });

  seasons.map(function (team) {})

  await Promise.all([
    db.league.League.insertMany(leagueDocs),
    db.season.Season.insertMany(seasons)
  ]);
  await db.disconnect();
}

main();

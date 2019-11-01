const rp = require("request-promise");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("../models");

COMPETITIONS_URL =
  "https://footballapi.pulselive.com/football/competitions?page=0&pageSize=100&detail=2";

TEAMS_URL = "https://footballapi.pulselive.com/football/compseasons/274/teams";

let range = n => Array.from(Array(n).keys())

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
    db.team.Team.deleteMany({}).exec(),
    db.player.Player.deleteMany({}).exec()
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

  scrapeSeasons = [274, 288];
  seasonTeams = await Promise.all(
    scrapeSeasons.map(season => {
      const url = `https://footballapi.pulselive.com/football/compseasons/${season}/teams`;
      return rp({
        uri: url,
        json: true
      });
    })
  );

  teams = {};
  
  for (let i = 0; i<scrapeSeasons.length; i++) {
    const teamList = seasonTeams[i];
    for (const team of teamList) {
      const newTeam = {
        teamID: team.id,
        name: team.name,
        shortName: team.shortName,
        teamType: team.teamType,
        seasonID: [scrapeSeasons[i]]
      }

      if (teams[team.id]) {
        teams[team.id].seasonID.push(scrapeSeasons[i])
      } else {
        teams[team.id] = newTeam;
      }
    }
  }

  teams = Object.values(teams);
  players = {};

  for (const season of scrapeSeasons) {
    console.log(`Scraping players for season ID ${season}`);
    (await Promise.all(range(30).map((page) => {
      const url = `https://footballapi.pulselive.com/football/players?pageSize=30&compSeasons=${season}&altIds=true&page=${page}&type=player&compSeasonId=${season}`
        return rp({
          uri: url,
          json: true
        });
    }))).map((page) => {
      for (const player of page.content) {
        players[player.id] = {
          playerID: player.id,
          name: player.name.display,
          position: player.info.positionInfo,
          shirtNum: player.info.shirtNum,
          country: player.nationalTeam.country,
          birthDate: player.birth.date ? player.birth.date.label : "None",
          teamID: player.currentTeam ? player.currentTeam.id : "None"
        };
      }
    });
  }

  players = Object.values(players);
  await Promise.all([
    db.league.League.insertMany(leagueDocs),
    db.season.Season.insertMany(seasons),
    db.team.Team.insertMany(teams),
    db.player.Player.insertMany(players)
  ]);
  await db.disconnect();
}

main();

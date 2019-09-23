const mongoose = require('mongoose');

var player = new mongoose.Schema({
    playerID: {type: Number, required: true, unique: true, index: true},
    name: {type: String, required: true},
    position: String,
    shirtNum: Number,
    nationalTeamCountry: String,
    country: String,
    birthDate: Date
});

const Player =  mongoose.model("Player", player);

exports.insertPlayer = async function(playerID, name, position, shirtNum, nationalTeamCountry, country, birthDate) {
    const newPlayer = new Player({
        playerID: playerID,
        name: name,
        position: position,
        shirtNum: shirtNum,
        nationalTeamCountry: nationalTeamCountry,
        country: country,
        birthDate: birthDate
    });

    await newPlayer.save();
}

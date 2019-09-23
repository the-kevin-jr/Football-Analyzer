const mongoose = require('mongoose')

var season = new mongoose.Schema({
    SeasonID: Number,
    TeamID: String,
    PlayerID: Number
})
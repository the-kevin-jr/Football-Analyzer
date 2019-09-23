const mongoose = require('mongoose')

var player = new mongoose.Schema({
    id: Number,
    name: String,
    position: String,
    shirtNum: Number,
    nationalTeamCountry: String,
    Country: String,
    birthDate: Date
})
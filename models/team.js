const mongoose = require('mongoose')

var team = new mongoose.Schema({
    id: Number,
    Name: String,
    shortName: String,
    abbr: String,
    TeamType: String,
    GroundID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GrndID'
    }]
})
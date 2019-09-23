const mongoose = require('mongoose')

var season = new mongoose.Schema({
    ID: Number,
    Label: String,
    Abbr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Abbr'
    }]
})
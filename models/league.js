const mongoose = require("mongoose")

var league = new mongoose.Schema({
    Abbr: String,   
    Name: String,
    Level: String
})

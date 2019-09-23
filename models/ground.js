const mongoose = require("mongoose");

var ground = new mongoose.Schema({
    Name: String,
    ID: Number,
    city: String,
    capacity: Number,
    location: {
        latitude: Number,
        longitude: Number
    }
});


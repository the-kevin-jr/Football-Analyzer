const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

const app = express();


app.get('/', function (req, res) {
    res.send("Hello World!");
});
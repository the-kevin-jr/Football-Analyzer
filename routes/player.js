const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Player = require("../models/player");

router.get("/", function (req, res) {
    res.send("Works");
});

exports.router = router;

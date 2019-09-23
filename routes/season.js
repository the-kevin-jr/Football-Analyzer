const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Season = require("../models/season");

router.get("/", function (req, res) {
    res.send("Works");
});

exports.router = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const League = require("../models/league");

router.get("/", function (req, res) {
    res.send("Works");
});

exports.router = router;

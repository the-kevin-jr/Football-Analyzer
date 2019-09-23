const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Team = require("../models/team")
router.get("/", function (req, res) {
    res.send("Works");
});

exports.router = router;

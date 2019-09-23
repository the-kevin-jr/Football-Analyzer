const groundRouter = require("./ground").router;
const leagueRouter =  require("./league").router;
const playerRouter = require("./player").router;
const seasonRouter = require("./season").router;
const teamRouter = require("./team").router;

const express = require("express");

const router = express.Router();

router.use("/grounds", groundRouter);
router.use("/leagues", leagueRouter);
router.use("/players", playerRouter);
router.use("/seasons", seasonRouter);
router.use("/teams", teamRouter);

exports.router = router;
const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()

const apiRouter = require("./routes").router;

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true}, function () {
    console.log("Connected to mongodb!");
});

const app = express();

app.use(apiRouter);

app.get('/', function (req, res) {
    res.send("Hello World!");
});

const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`))
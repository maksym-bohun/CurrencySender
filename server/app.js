const express = require("express");
const exchangeRateRoutes = require("./routes/exchangeRateRoutes");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();

app.use(bodyParser.json({ limit: "20mb" }));
app.use("/api", jsonParser, exchangeRateRoutes);

module.exports = app;

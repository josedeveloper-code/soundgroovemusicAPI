require("dotenv").config();
const express = require("express");
const app = express();

// middleware
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authentication");
const authorize = require("./middleware/Authorization");

app.use(logger);
app.use(express.json());

// routes
app.use("/artists", require("./routes/artistroutes.js"));
app.use("/tracks", require("./routes/trackroutes.js"));
app.use("/users", require("./routes/userroutes.js"));

module.exports = app;


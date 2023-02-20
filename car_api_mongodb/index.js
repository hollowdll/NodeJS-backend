"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

require("dotenv").config();
mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());
app.use("/api", routes);

// Your MongoDB connection string
const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.error("\x1b[41m%s\x1b[0m", "MongoDB connection error!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
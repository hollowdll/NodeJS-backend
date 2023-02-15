const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./routes");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/", routes);

// MongoDB connection
const mongoURL = process.env.DB_URL   // YOUR_CONNECTION_STRING
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
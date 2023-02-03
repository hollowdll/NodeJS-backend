const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/dbconfig");

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Get all movies
app.get("/api/movies", (req, res) => {
    console.log("GET /api/movies");

    db.query("SELECT * FROM movies", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.json(result.rows);
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
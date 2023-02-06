const express = require("express");
const bodyParser = require("body-parser");
const query = require("./db/movies");

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Get all movies
app.get("/api/movies", query.getAllMovies);

// Get movie by id
app.get("/api/movies/:id", query.getMovieById);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
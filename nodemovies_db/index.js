require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./db/movies");
const auth = require("./services/authenticate");

const app = express();
app.use(bodyParser.json());

const port = 3000;

// REST API routes
app.get("/api/movies", auth.authenticate, query.getAllMovies);
app.get("/api/movies/:id", auth.authenticate, query.getMovieById);
app.post("/api/movies", auth.authenticate, query.addMovie);
app.delete("/api/movies/:id", auth.authenticate, query.deleteMovie);
app.put("/api/movies/:id", auth.authenticate, query.updateMovie);

// Login route
app.post("/login", auth.login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;

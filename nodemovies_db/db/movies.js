const db = require("./dbconfig");

// Get all movies
const getAllMovies = (_req, res) => {
  console.log("Get all movies");

  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result.rows);
    }
  });
};

// Get movie by id
const getMovieById = (req, res) => {
  console.log("Get movie by id");

  const query = {
    text: "SELECT * FROM movies WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, results) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
      if (results.rows.length > 0) {
        res.json(results.rows);
      } else {
        res.status(404).end();
      }
    }
  });
};

// Add new movies
const addMovie = (req, res) => {
  const newMovie = req.body;

  const query = {
    text: "INSERT INTO movies (title, director, year) VALUES ($1, $2, $3)",
    values: [newMovie.title, newMovie.director, newMovie.year],
  };

  db.query(query, (err, _res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });

  res.json(newMovie);
};

// Delete movie
const deleteMovie = (req, res) => {
  const query = {
    text: "DELETE FROM movies WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, _res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });

  res.status(204).end();
};

// Update movie
const updateMovie = (req, res) => {
  const editedMovie = req.body;

  const query = {
    text: "UPDATE movies SET title=$1, director=$2, year=$3 WHERE id = $4",
    values: [
      editedMovie.title,
      editedMovie.director,
      editedMovie.year,
      req.params.id,
    ],
  };

  db.query(query, (err, _res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });

  res.json(editedMovie);
};

// Delete all
const deleteAllMovies = () => {
  db.query("DELETE FROM movies", (err, _res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
  deleteAllMovies,
};

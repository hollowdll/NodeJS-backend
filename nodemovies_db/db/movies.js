const db = require("./dbconfig")

// Get all movies
const getAllMovies = (req, res) => {
    console.log("Get all movies");

    db.query("SELECT * FROM movies", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.json(result.rows);
        }
    })
}

// Get movie by id
const getMovieById = (req, res) => {
    console.log("Get movie by id");

    const query = {
        text: "SELECT * FROM movies WHERE id = $1",
        values: [req.params.id],
    }

    db.query(query, (err, results) => {
        if (err) {
            return console.error("Error executing query", err.stack)
        }
        else {
            if (results.rows.length > 0) {
                res.json(results.rows);
            }
            else {
                res.status(404).end();
            }
        }
    })
}

module.exports = {
    getAllMovies,
    getMovieById,
}
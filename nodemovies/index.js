import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

let movies = [
    {
        id: '1588323375416',
        title: 'Star Wars: Episode IX - The Rise of Skywalker',
        year: 2019,
        director: 'J.J. Abrams'
    },
    {
        id: '1588323390624',
        title: 'The Irishman',
        year: 2019,
        director: 'Martin Scorsese'
    },
    {
        id: '1588323412643',
        title: 'Harry Potter and the Sorcerers Stone',
        year: 2001,
        director: 'Chris Columbus'
    }
];

// Fetch all movies
app.get("/api/movies", (_req, res) => {
    console.log("GET /api/movies");

    res.json(movies);
});

// Fetch movie by id
app.get("/api/movies/:id", (req, res) => {
    console.log("GET /api/movies/:id");

    const movieId = req.params.id;
    const movie = movies.filter(movie => movie.id === movieId);

    if (movie.length > 0) {
        res.json(movie);
    } else {
        res.status(404).end();
    }
});

// Create new movie
app.post("/api/movies", (req, res) => {
    console.log("POST /api/movies");
    console.log(req.body);

    const newMovie = {
        "id": Date.now(),
        ...req.body
    };

    movies = [...movies, newMovie];

    res.json(newMovie);
    
});

// Delete movie
app.delete("/api/movies/:id", (req, res) => {
    console.log("DELETE /api/movies/:id");

    const id = req.params.id;

    movies = movies.filter(movie => movie.id !== id);
    res.status(204).end();
});

// Update movie
app.put("/api/movies/:id", (req, res) => {
    console.log("PUT /api/movies/:id");

    const id = req.params.id;
    const updatedMovie = {
        "id": id,
        ...req.body
    };

    // index of movie to update
    const index = movies.findIndex(movie => movie.id === id);

    movies.splice(index, 1, updatedMovie);

    res.json(updatedMovie);
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});
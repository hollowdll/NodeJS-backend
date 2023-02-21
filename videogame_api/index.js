// Small REST API for testing HTTP methods and CRUD operations
// No database; data is stored in memory

"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// For sample data ID generation
let milliseconds = Date.now();

let games = [
    {
        id: milliseconds + 1,
        name: "Dark Souls",
        year: 2011,
    },
    {
        id: milliseconds + 2,
        name: "Bloodborne",
        year: 2015,
    },
    {
        id: milliseconds + 3,
        name: "Sekiro",
        year: 2019,
    },
];

// Fetch all
app.get("/api/games", (req, res) => {
    res.json(games);
});

// Fetch by id
app.get("/api/games/:id", (req, res) => {
    const id = req.params.id;
    const game = games.filter(game => game.id === id);

    if (game.length > 0) {
        res.json(game);
    } else {
        res.status(404).end();
    }
});

// Add new
app.post("/api/games", (req, res) => {
    console.log(req.body);

    const game = {
        "id": Date.now(),
        ...req.body
    };

    games = [...games, game];

    res.json(game);
});

// Delete by id
app.delete("/api/games/:id", (req, res) => {
    const id = req.params.id;

    games = games.filter(game => game.id !== id);
    
    res.status(204).end();
});

// Update by id
app.put("/api/games/:id", (req, res) => {
    const id = req.params.id;
    const updatedGame = {
        "id": id,
        ...req.body
    };

    const index = games.findIndex(game => game.id === id);
    games.splice(index, 1, updatedGame);

    res.json(updatedGame);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
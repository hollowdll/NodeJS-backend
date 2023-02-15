const express = require("express");
const router = express.Router();
const movieModel = require("./models/movie");

// Fetch all
router.get("/movies", async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.send(movies);
    } catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }
})

module.exports = router;
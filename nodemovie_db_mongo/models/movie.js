const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlenght: 150,
  },
  director: {
    type: String,
    required: true,
    maxlenght: 200,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
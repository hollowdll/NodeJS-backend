"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
    maxlength: 150,
  },
  model: {
    type: String,
    required: true,
    maxlength: 150,
  },
  color: {
    type: String,
    required: true,
    maxlength: 150,
  },
  year: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Car", carSchema);
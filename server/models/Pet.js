// models/Pet.js
const mongoose = require('mongoose');

// Define schema
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;

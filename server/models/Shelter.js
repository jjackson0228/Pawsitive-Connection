const mongoose = require('mongoose');

// Define the Shelter schema
const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Shelter name is required
  },
  location: {
    type: String,
    required: true, // Location is required
  },
  capacity: {
    type: Number,
    required: true, // Total capacity of the shelter
    min: 0, // Ensure capacity is a non-negative number
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Pet model
      ref: 'Pet', // Refers to the Pet model
    },
  ],
  description: {
    type: String,
  },
});

// Create the Shelter model
const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;

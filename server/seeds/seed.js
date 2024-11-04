const db = require('../config/connection');
const dataSeeds = require('./dataSeeds.json');
const cleanDB = require('./cleanDB');
const { Pet, Shelter, User } = require('../models');

db.once('open', async () => {
  try {
    // Clear existing data for Pets, Shelter, and User collections
    await cleanDB('Pets', 'pets');
    await cleanDB('Shelter', 'shelters');
    await cleanDB('User', 'users');

    // Seed data into each collection
    await Pet.create(dataSeeds.pets);
    await Shelter.create(dataSeeds.shelters);
    await User.create(dataSeeds.users);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});

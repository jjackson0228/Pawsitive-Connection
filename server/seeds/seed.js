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

    // Seed data into Pets collection
    const createdPets = await Pet.create(dataSeeds.pets);

    // Prepare shelters with specific pets
    const sheltersWithPets = dataSeeds.shelters.map((shelter, index) => ({
      ...shelter,
      pets: [createdPets[index]._id] // Associate only one pet per shelter
    }));

    // Seed data into Shelter collection
    await Shelter.create(sheltersWithPets);

    // If you have user data, seed it as well
    await User.create(dataSeeds.users);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});

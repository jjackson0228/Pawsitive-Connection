const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    // Check if the collection exists by listing collections in the database
    const modelExists = await db.db
      .listCollections({ name: collectionName })
      .toArray();

    // If the collection exists, drop it
    if (modelExists.length > 0) {
      await db.dropCollection(collectionName);
      console.log(`Dropped collection: ${collectionName}`);
    } else {
      console.log(
        `Collection ${collectionName} does not exist, skipping drop.`
      );
    }
  } catch (err) {
    console.error(`Error dropping collection ${collectionName}:`, err);
    throw err;
  }
};

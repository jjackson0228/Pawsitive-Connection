// Import Mongoose models for Pet, Adopter, and AdoptionRequest
const Pet = require('../models/Pets');
const Adopter = require('../models/Adopter');
const AdoptionRequest = require('../models/AdoptionRequest');

// Define GraphQL resolvers for Queries and Mutations
const resolvers = {
  // Query resolvers handle fetching data based on requests from the client
  Query: {
    // Fetch a list of pets, with optional filters for type and adoption status
    pets: async (_, { type, adopted }) => {
      const query = {};
      // Filter by type if provided
      if (type) query.type = type;
      // Filter by adoption status if provided
      if (typeof adopted === 'boolean') query.adopted = adopted;
      return await Pet.find(query).populate('adopter');
    },
    // Fetch a specific pet by ID and populate the adopter field
    pet: async (_, { id }) => await Pet.findById(id).populate('adopter'),
    // Fetch all adopters in the database
    adopters: async () => await Adopter.find(),
    // Fetch a specific adopter by ID and populate their adoptedPets field
    adopter: async (_, { id }) =>
      await Adopter.findById(id).populate('adoptedPets'),

    // Fetch adoption requests, with an optional filter by request status
    adoptionRequests: async (_, { status }) => {
      const query = status ? { status } : {};
      // Find adoption requests matching the query and populate pet and adopter fields
      return await AdoptionRequest.find(query).populate(['pet', 'adopter']);
    },
    adoptionRequest: async (_, { id }) =>
      await AdoptionRequest.findById(id).populate(['pet', 'adopter']),
  },

  // Mutation resolvers handle data modifications (creating, updating, or deleting data)
  Mutation: {
    addPet: async (_, { name, type, breed, age, description }) => {
      // Create a new Pet instance with the provided details and default adopted status of false
      const pet = new Pet({
        name,
        type,
        breed,
        age,
        description,
        adopted: false,
      });
      return await pet.save();
    },

    // Update an existing pet's adoption status by ID
    updatePet: async (_, { id, adopted }) => {
      // Update the adopted status and populate the adopter field if any
      return await Pet.findByIdAndUpdate(
        id,
        { adopted },
        { new: true }
      ).populate('adopter');
    },
    // Add a new adopter to the database
    addAdopter: async (_, { name, email, phone }) => {
      const adopter = new Adopter({ name, email, phone });
      return await adopter.save();
    },

    // Create a new adoption request for a pet by an adopter
    createAdoptionRequest: async (_, { petId, adopterId }) => {
      // Verify that the pet exists and is available for adoption
      const pet = await Pet.findById(petId);
      if (!pet || pet.adopted)
        throw new Error('Pet not available for adoption');

      // Verify that the adopter exists
      const adopter = await Adopter.findById(adopterId);
      if (!adopter) throw new Error('Adopter not found');

      // Create a new adoption request with a status of "Pending"
      const adoptionRequest = new AdoptionRequest({
        pet: petId,
        adopter: adopterId,
        status: 'Pending',
        requestDate: new Date().toISOString(),
      });

      return await adoptionRequest.save();
    },

    // Update the status of an existing adoption request by ID
    updateAdoptionRequest: async (_, { id, status }) => {
      // Find the adoption request by ID and throw an error if not found
      const adoptionRequest = await AdoptionRequest.findById(id);
      if (!adoptionRequest) throw new Error('Adoption request not found');

      // Update the status of the adoption request
      adoptionRequest.status = status;
      await adoptionRequest.save();

      // If the request is approved, mark the pet as adopted and assign the adopter
      if (status === 'Approved') {
        const pet = await Pet.findById(adoptionRequest.pet);
        pet.adopted = true;
        pet.adopter = adoptionRequest.adopter;
        await pet.save();
      }

      return adoptionRequest;
    },
  },
};

module.exports = resolvers;

const { User, Pet, Shelter } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getUserProfile: async (parent, { id }) => {
      try {
        const userProfile = await User.findById(id);
        if (!userProfile) {
          throw new Error("User profile not found");
        }
        return userProfile;
      } catch (err) {
        throw new Error(`Error getting User ${err.message}`);
      }
    },

    // get all pets
    getAllPets: async () => {
      try {
        const pets = await Pet.find();
        return pets;
      } catch (err) {
        throw new Error(`Error getting pets ${err.message}`);
      }
    },

    // get pet by id
    getPetById: async (parent, { id }) => {
      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          throw new Error("Pet not found");
        }
        return pet;
      } catch (err) {
        throw new Error(`Error getting pets: ${err.message}`);
      }
    },

    // get all shelters
    getAllShelters: async () => {
      try {
        const shelters = await Shelter.find().populate("pets");
        return shelters;
      } catch (err) {
        throw new Error("Error getting shelters");
      }
    },

    // get a shelter by ID
    getShelterById: async (_, { id }) => {
      try {
        const shelter = await Shelter.findById(id).populate("pets");
        if (!shelter) {
          throw new Error("Shelter not found");
        }
        return shelter;
      } catch (err) {
        throw new Error("Error getting shelter");
      }
    },

    // get user with pets
    user: async (parents, args, context) => {
  console.log('Context user:', context.user);
  
  if (context.user) {
    console.log('lalalaa'); // Log the user ID

    try {
      const user = await User.findById(context.user._id).populate({
        path: 'pets',
      });
      
      if (!user) {
        console.log("user not found in resolver");
        throw new Error('User not found');
      }
      console.log(`User is ${user}`);
      return user;
      
    } catch (err) {
      console.log("error was caught on user resolver");
      throw new Error(`Error getting user: ${err.message}`);
    }
  } else {
    console.log("user not authed");
    throw new Error('User not authenticated');
  }
},

    // backup get user since above one is not working
    /* user: async (parents, args, context) => {
      if (context.user) {
        return context.user; // Return the user directly from context
      } else {
        throw new Error("User not authenticated");
      }
    }, */
  },
  Mutation: {
    // creates user
    addUser: async (parents, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // user login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addPetToShelter: async (_, { shelterId, petId }) => {
      try {
        // Find the shelter and push the pet's ID into the pets array
        const updatedShelter = await Shelter.findByIdAndUpdate(
          shelterId,
          { $addToSet: { pets: petId } }, // Use $addToSet to avoid duplicates
          { new: true } // Return the updated document
        ).populate('pets'); // Populate pets to return the full shelter object with pets

        return updatedShelter;
      } catch (err) {
        console.error('Error adding pet to shelter:', err);
        throw new Error('Could not add pet to shelter');
      }
    },
  },
};

module.exports = resolvers;

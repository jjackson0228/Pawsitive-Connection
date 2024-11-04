const { User, Pet, Shelter } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
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

    //

    // get user with pets
    user: async (parents, args, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user.id).populate({
            path: "pets",
          });
          if (!user) {
            throw new Error("User not found");
          }
          return user;
        } catch (err) {
          throw new Error(`Error getting user ${err.message}`);
        }
      } else {
        throw new Error("User not authenticated");
      }
    },
  },
  Mutation: {
    // creates user
    addUser: async (parents, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // user login
    login: async (parent, { username, password }) => {
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
  },
};

module.exports = resolvers;

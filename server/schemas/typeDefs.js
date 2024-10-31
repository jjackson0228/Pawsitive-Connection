const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define custom types....this typeDefs file matches the resolvers.js file
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Pet {
    id: ID!
    name: String
    type: String! # e.g., "Dog", "Cat"
    Breed: String
    age: Int
    description: String
    adopted: Boolean!
    adopter: Adopter
  }

  type Adopter {
    id: ID!
    name: String!
    email: String!
    phone: String
    adoptedPets: [Pet] # List of adopted pets
  }

  type AdoptionRequest {
    id: ID!
    pet: Pet!
    adopter: Adopter!
    status: String! # e.g., "Pending", "Approved", "Rejected"
    requestDate: String!
  }

  # Define Queries to retrieve data
  type Query {
    pets(type: String, adopted: Boolean): [Pet]
    pet(id: ID!): Pet
    adopters: [Adopter]
    adopter(id: ID!): Adopter
    adoptionRequests(status: String): [AdoptionRequest]
    adoptionRequest(id: ID!): AdoptionRequest
  }

  # Define Mutations to modify data
  type Mutation {
    addPet(
      name: String!
      type: String!
      breed: String
      age: Int
      description: String
    ): Pet
    updatePet(id: ID!, adopted: Boolean!): Pet

    addAdopter(name: String!, email: String!, phone: String): Adopter

    createAdoptionRequest(petId: ID!, adopterId: ID!): AdoptionRequest
    updateAdoptionRequest(id: ID!, status: String!): AdoptionRequest
  }
`;

module.exports = typeDefs;

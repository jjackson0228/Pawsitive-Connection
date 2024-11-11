const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  bio: String
  avatar: String
  pets: [Pet]
}

type Pet {
  _id: ID!
  name: String!
  type: String!
  age: Int!
  color: String
  description: String!
  image: String!
  createdAt: String!
}

type Shelter {
  id: ID!
  name: String!
  location: String!
  capacity: Int!
  pets: [Pet]
  description: String
}

type SavePetResponse {
  success: Boolean!
  message: String!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  getAllPets: [Pet]
  getPetById(id: ID!): Pet
  getAllShelters: [Shelter]
  getShelterById(id: ID!): Shelter
  user: User
  pets(filter: PetFilterInput): [Pet]
  getUserProfile(id: ID!): User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPetToShelter(shelterId: ID!, petId: ID!): Shelter
  savePetToProfile(id: ID!): SavePetResponse
  removePetFromUser(petId: ID!): User
}

input PetFilterInput {
  type: String
  age: Int
  color: String
}
`;

module.exports = typeDefs;

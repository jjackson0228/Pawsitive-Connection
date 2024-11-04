const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
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

type Auth {
  token: ID!
  user: User
}

type Query {
  getAllPets: [Pet]
  getPetById(id: ID!): Pet
  user: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;

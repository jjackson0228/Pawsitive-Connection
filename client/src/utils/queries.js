import { gql } from '@apollo/client';

// Query to fetch all pets
export const GET_ALL_PETS = gql`
  query GetAllPets {
    getAllPets {
      _id
      name
      type
      age
      color
      description
      image
    }
  }
`;

// Query to fetch a specific pet by ID
export const GET_PET_BY_ID = gql`
  query GetPetById($id: ID!) {
    getPetById(id: $id) {
      _id
      name
      type
      age
      color
      description
      image
    }
  }
`;

// Query to fetch all shelters
export const GET_ALL_SHELTERS = gql`
  query GetAllShelters {
    getAllShelters {
      id
      name
      location
      capacity
      description
      pets {
        _id
        name
        type
      }
    }
  }
`;

// Query to fetch the authenticated user's data
export const GET_USER = gql`
  query GetUser {
    user {
      _id
      username
      email
      pets {
        _id
        name
        type
      }
    }
  }
`;

// Query to fetch a specific shelter by ID
export const GET_SHELTER_BY_ID = gql`
  query GetShelterById($id: ID!) {
    getShelterById(id: $id) {
      id
      name
      location
      capacity
      description
      pets {
        _id
        name
        type
      }
    }
  }
`;

// Query to fetch pets with optional filters
export const GET_PETS_WITH_FILTER = gql`
  query GetPetsWithFilter($filter: PetFilterInput) {
    pets(filter: $filter) {
      _id
      name
      type
      age
      color
      description
      image
      createdAt
    }
  }
`;

export default {
  GET_ALL_PETS,
  GET_PET_BY_ID,
  GET_ALL_SHELTERS,
  GET_SHELTER_BY_ID,
  GET_USER,
  GET_PETS_WITH_FILTER,
};

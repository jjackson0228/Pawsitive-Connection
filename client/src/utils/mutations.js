// mutations.js
import { gql } from "@apollo/client";

// Mutation to add a new user (for signup)
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

//mutation for save pet to profile
export const SAVE_PET_TO_PROFILE = gql`
  mutation SavePetToProfile($id: ID!) {
    savePetToProfile(id: $id) {
      success
      message
    }
  }
`;

// Mutation for user login
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to add a new pet
export const ADD_PET = gql`
  mutation AddPet(
    $name: String!
    $type: String!
    $age: Int!
    $color: String
    $description: String!
    $image: String!
  ) {
    addPet(
      name: $name
      type: $type
      age: $age
      color: $color
      description: $description
      image: $image
    ) {
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

// Mutation to add a new shelter
export const ADD_SHELTER = gql`
  mutation AddShelter(
    $name: String!
    $location: String!
    $capacity: Int!
    $description: String
  ) {
    addShelter(
      name: $name
      location: $location
      capacity: $capacity
      description: $description
    ) {
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

export const REMOVE_PET_FROM_USER = gql`
  mutation RemovePetFromUser($petId: ID!) {
    removePetFromUser(petId: $petId) {
      _id
      username
      email
      pets {
        _id
        name
        type
        age
        color
        description
        image
      }
    }
  }
`;

export default {
  ADD_USER,
  LOGIN_USER,
  ADD_PET,
  ADD_SHELTER,
  SAVE_PET_TO_PROFILE,
  REMOVE_PET_FROM_USER,
};

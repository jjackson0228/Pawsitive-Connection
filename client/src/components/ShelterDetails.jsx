// ShelterDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const GET_SHELTER_DETAILS = gql`
  query GetShelterDetails($id: ID!) {
    getShelter(id: $id) {
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

export default function ShelterDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SHELTER_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shelter = data?.getShelter;

  return (
    <div>
      <h1>{shelter.name}</h1>
      <p>{shelter.location}</p>
      <p>{shelter.capacity}</p>
      <p>{shelter.description}</p>
      <ul>
        {shelter.pets.map((pet) => (
          <li key={pet._id}>
            {pet.name} - {pet.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

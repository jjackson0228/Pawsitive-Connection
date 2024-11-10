// ShelterDetails.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styled from "@emotion/styled";

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

// Styled components for better layout and design
const Container = styled.div`
  max-width: 800px;
  margin: 200px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-top: 20px;
`;

const PetList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PetItem = styled.li`
  margin: 10px 0;
  font-size: 1.2em;
`;

const PetLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ShelterDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SHELTER_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shelter = data?.getShelterById;

  // Handle case where shelter might not be found
  if (!shelter) return <p>No shelter found with this ID.</p>;

  return (
    <Container>
      <Title>{shelter.name || 'Shelter Name Not Available'}</Title>
      <p><strong>Location:</strong> {shelter.location || 'Location Not Available'}</p>
      <p><strong>Capacity:</strong> {shelter.capacity || 'Capacity Not Available'}</p>
      <p><strong>Description:</strong> {shelter.description || 'Description Not Available'}</p>
      <Subtitle>Available Pets:</Subtitle>
      {shelter.pets && shelter.pets.length > 0 ? (
        <PetList>
          {shelter.pets.map((pet) => (
            <PetItem key={pet._id}>
              <PetLink to={`/pet/${pet._id}`}>
                {pet.name} - {pet.type}
              </PetLink>
            </PetItem>
          ))}
        </PetList>
      ) : (
        <p>No pets available at this shelter.</p>
      )}
    </Container>
  );
}

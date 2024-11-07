import React from 'react';
import { useQuery, gql } from '@apollo/client';
import PetCard from '../components/PetCard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
      createdAt
    }
  }
`;

const PetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  padding-top: 80px;
  background-color: #f9f9f9;
`;

const Pets = () => {
  const { loading, error, data } = useQuery(GET_ALL_PETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pets: {error.message}</p>;

  // Ensure data and data.getAllPets are defined before mapping
  const pets = data?.getAllPets || [];

  // this page displays all of the pets

  return (
    <PetsContainer>
      {pets.map((pet) => (
        <PetCard
          key={pet._id}
          name={pet.name}
          type={pet.type}
          age={pet.age}
          color={pet.color}
          description={pet.description}
          image={pet.image}
        />
      ))}
    </PetsContainer>
  );
};

export default Pets;

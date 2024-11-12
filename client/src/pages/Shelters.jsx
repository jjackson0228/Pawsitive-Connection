import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ShelterCard from '../components/ShelterCard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

const SheltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  padding-top: 100px;
  margin: 30px 100px;
  background-color: #f0e6d2;
`;

const SheltersCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  padding-top: 100px;
  margin: 30px 100px;
  background-color: #f0e6d2;
`;

export default function Shelters() {
  const { loading, error, data } = useQuery(GET_ALL_SHELTERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shelters = data?.getAllShelters || [];
  return (
    <SheltersContainer>
      {shelters.map((shelter) => (
        <ShelterCard key={shelter.id} shelter={shelter} />
      ))}
    </SheltersContainer>
  );
}

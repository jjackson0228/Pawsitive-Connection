import React from "react";
import { useQuery, gql } from "@apollo/client";
import ShelterCard from "../components/ShelterCard";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

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

  flex-wrap: wrap; /* Allow cards to wrap to the next line */
  justify-content: center; /* Center the cards */

  // flex-direction: column; /* Stack cards vertically */
  //padding: 20px;
  //padding-top: 80px;
//`;

  padding: 20px;
  padding-top: 150px;
  margin: 0 auto; /* Center the container */
  max-width: 1200px; /* Set a max width for better readability */
`;

// shelters page

/*export default function Shelters() {

  const { loading, error, data } = useQuery(GET_ALL_SHELTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shelters = data?.getAllShelters || [];
  console.log(shelters);

  return (
    <SheltersContainer>
      {shelters.map((shelter) => (
        <ShelterCard key={shelter._id} shelter={shelter} />
      ))}
    </SheltersContainer>
  );
}*/
// Shelters.jsx

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ShelterCard from '../components/ShelterCard';
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
  flex-direction: column;
`;

export default function Shelters() {
  const { loading, error, data } = useQuery(GET_ALL_SHELTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shelters = data?.getAllShelters || [];

  return (
    <SheltersContainer>
      {shelters.map((shelter) => (
        <Link to={`/shelter/${shelter.id}`} key={shelter.id} style={{ textDecoration: 'none' }}>
          <ShelterCard shelter={shelter} />
        </Link>
      ))}
    </SheltersContainer>
  );
}

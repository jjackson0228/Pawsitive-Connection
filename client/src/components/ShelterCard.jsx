import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 10px; /* Added margin between cards */
  background-color: #fff;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin: 0;
`;

const PetsList = styled.ul`
  list-style: none;
  padding: 0;
`;

// cards that are rendered on the shelter page

const ShelterCard = ({ shelter }) => {
  return (
    <CardContainer>
      <InfoContainer>
        <Link to={`/shelter/${shelter.id}`}>
          <Title>{shelter.name}</Title>
        </Link>
        <p>
          <strong>Location:</strong> {shelter.location}
        </p>
      </InfoContainer>
    </CardContainer>
  );
};

export default ShelterCard;

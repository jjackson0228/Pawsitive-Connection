import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%; /* Full width of the card */
  //margin: 10px 0; /* Margin between cards */
`;

const InfoContainer = styled.div`
  flex: 1; /* Allow the info container to take up remaining space */
  //padding: 10px;
  //`;

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
        <Title>{shelter.name}</Title>
        <p>
          <strong>Location:</strong> {shelter.location}
        </p>
        <p>
          <strong>Capacity:</strong> {shelter.capacity}
        </p>
        <p>
          <strong>Description:</strong> {shelter.description}
        </p>
      </InfoContainer>

      {shelter.pets && shelter.pets.length > 0 ? (
        <div>
          <h3>Available Pets:</h3>
          <PetsList>
            {shelter.pets.map((pet) => (
              <li key={pet._id}>
                {pet.name} - {pet.type}
              </li>
            ))}
          </PetsList>
        </div>
      ) : (
        <p>No pets available at the moment.</p>
      )}
    </CardContainer>
  );
};

export default ShelterCard;

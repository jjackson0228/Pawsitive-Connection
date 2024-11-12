import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px; // Reduced padding
  margin: 12px; // Reduced margin
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: #fff;
  width: 150px; // Set a fixed width for the card
  height: auto; // Allow height to adjust based on content

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 130px; //
    max-height: 130px; //
    border-radius: 8px;
  }

  h2 {
    font-size: 1.2em; // Reduced font size
    margin: 0.3em 0; // Adjusted margin
  }

  p {
    font-size: 0.9em; // Reduced font size
    margin: 0.3em 0; // Adjusted margin
  }
`;

// this is the card that goes in Pets.jsx

const PetCard = ({ id, name, type, age, color, description, image }) => {
  return (
    <Link to={`/pet/${id}`} className="pet-card">
      <Card className="pet-card">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>Type: {type}</p>
        <p>Age: {age} years</p>
        {color && <p>Color: {color}</p>}
      </Card>
    </Link>
  );
};

export default PetCard;

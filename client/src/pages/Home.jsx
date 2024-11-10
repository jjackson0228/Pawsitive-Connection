import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Searchbar'; // Import SearchBar component
import DonateBox from '../components/DonateBox';

const Container = styled.div`
  text-align: center;
  margin-top: 10vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.2em;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AdoptButton = styled.button`
  padding: 15px 30px;
  font-size: 1.5em;
  color: white;
  background-color: #4da3d1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3b8cbf;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pets, setPets] = useState([
    { name: 'Buddy', type: 'Dog', age: 2, color: 'Brown' },
    { name: 'Mittens', type: 'Cat', age: 3, color: 'White' },
    { name: 'Goldie', type: 'Fish', age: 1, color: 'Gold' },
    // Add more pets here
  ]);

  // Filter pets based on search query
  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdoptClick = () => {
    navigate('/pets');
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query
  };

  return (
    <Container>
      <Title>Welcome to Pawsitive Connection!</Title>
      <Description>
        At Pawsitive Connection, we believe that every pet deserves a loving
        home. Explore our wonderful selection of furry friends waiting for their
        forever families.
      </Description>
      <SearchBar onSearch={handleSearch} /> {/* Add SearchBar to the page */}
      {/* Display filtered pets */}
      <div>
        {filteredPets.length > 0 ? (
          filteredPets.map((pet, index) => (
            <div key={index}>
              <h3>{pet.name}</h3>
              <p>Type: {pet.type}</p>
              <p>Age: {pet.age}</p>
              <p>Color: {pet.color}</p>
            </div>
          ))
        ) : (
          <p>No pets found.</p>
        )}
      </div>
      <ButtonContainer>
        <AdoptButton onClick={handleAdoptClick}>Adopt</AdoptButton>
        <DonateBox />
      </ButtonContainer>
    </Container>
  );
}

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import PetCard from '../components/PetCard';
import styled from '@emotion/styled';
import Filter from '../components/filter';
import Searchbar from '../components/Searchbar';

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
  margin: 0 350px;
  background-color: 133e87;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center; // Center the filter bar horizontally
  margin-bottom: 20px; // Optional: add some space below the filter
`;

const SearchbarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Pets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, data } = useQuery(GET_ALL_PETS);
  const [filteredData, setFilteredData] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pets: {error.message}</p>;

  const pets = data?.getAllPets || [];

  // Set filteredData to show all pets initially if no filter is applied
  const displayPets = filteredData || pets;

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <section style={{ marginTop: '50px' }}>
      <FilterContainer>
        {/* Pass pets and setFilteredData as props to the Filter component */}
        <Filter data={pets} setData={setFilteredData} />
      </FilterContainer>
      <SearchbarContainer>
        <Searchbar onSearch={handleSearch} />
      </SearchbarContainer>
      <PetsContainer>
        {displayPets.map((pet) => (
          <PetCard
            key={pet._id}
            id={pet._id}
            name={pet.name}
            type={pet.type}
            age={pet.age}
            color={pet.color}
            image={pet.image}
          />
        ))}
      </PetsContainer>
    </section>
  );
};

export default Pets;

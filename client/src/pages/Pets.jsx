import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import PetCard from "../components/PetCard";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Filter from "../components/filter";

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
  const [filteredData, setFilteredData] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pets: {error.message}</p>;

  const pets = data?.getAllPets || [];

  // Set filteredData to show all pets initially if no filter is applied
  const displayPets = filteredData || pets;

  return (
    <section>
      {/* <Filter data={pets} setdata={setFilteredData} /> */}

      <PetsContainer>
        {displayPets.map((pet) => (
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
    </section>
  );
};

export default Pets;

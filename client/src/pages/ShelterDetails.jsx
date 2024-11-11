import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import PetCard from "../components/PetCard";

const GET_SHELTER_BY_ID = gql`
  query getShelterById($id: ID!) {
    getShelterById(id: $id) {
      name
      location
      capacity
      description
      pets {
        _id
        name
        age
        breed
        description
        image
      }
    }
  }
`;

const ShelterDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SHELTER_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shelter = data.getShelterById;

  return (
    <div>
      <h1>{shelter.name}</h1>
      <p><strong>Location:</strong> {shelter.location}</p>
      <p><strong>Capacity:</strong> {shelter.capacity}</p>
      <p><strong>Description:</strong> {shelter.description}</p>

      <h2>Available Pets</h2>
      <div className="pet-list">
        {shelter.pets.length > 0 ? (
          shelter.pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))
        ) : (
          <p>No pets available at this shelter.</p>
        )}
      </div>
    </div>
  );
};

export default ShelterDetails;

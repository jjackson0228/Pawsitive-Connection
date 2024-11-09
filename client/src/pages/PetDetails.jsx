import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_PET_BY_ID = gql`
  query GetPetById($id: ID!) {
    getPetById(id: $id) {
      _id
      name
      type
      age
      description
      image
    }
  }
`;

const SAVE_PET_TO_PROFILE = gql`
  mutation SavePetToProfile($id: ID!) {
    savePetToProfile(id: $id) {
      success
      message
    }
  }
`;

const PetDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PET_BY_ID, {
    variables: { id },
  });
  const [savePetToProfile] = useMutation(SAVE_PET_TO_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pet details: {error.message}</p>;

  const { name, type, age, description, image } = data.getPetById;

  const handleSavePet = async () => {
    try {
      const response = await savePetToProfile({ variables: { id } });
      if (response.data.savePetToProfile.success) {
        alert("Pet saved to your profile!");
      } else {
        alert(response.data.savePetToProfile.message);
      }
    } catch (err) {
      console.error("Error saving pet to profile:", err);
      alert("Failed to save pet. Please try again.");
    }
  };

  return (
    <div className="pet-details">
      <img src={image} alt={name} style={{ width: "100%", borderRadius: "8px" }} />
      <h2>{name}</h2>
      <p>Type: {type}</p>
      <p>Age: {age} years</p>
      <p>Description: {description}</p>
      <button onClick={handleSavePet}>Save to Profile</button>
    </div>
  );
};

export default PetDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh; /* Full height for centering */
  background-color: #f9f9f9; /* Light background color */
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px; /* Limit the card width */
  text-align: center; /* Center text */

  img {
    max-width: 100%;
    height: auto; /* Maintain aspect ratio */
    border-radius: 8px;
  }

  h2 {
    margin: 15px 0;
    font-size: 24px; /* Larger font size for the name */
  }

  p {
    margin: 10px 0;
    font-size: 16px; /* Font size for details */
    color: #555; /* Darker text for better readability */
  }
`;

const SaveButton = styled.button`
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
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
      console.log(response);
      if (response.data.savePetToProfile.success) {
        alert('Pet saved to your profile!');
      } else {
        alert(response.data.savePetToProfile.message);
      }
    } catch (err) {
      console.error('Error saving pet to profile:', err);
      alert('Failed to save pet. Please try again.');
    }
  };

  return (
    <Container>
      <Card className="pet-details">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>Type: {type}</p>
        <p>Age: {age} years</p>
        <p>{description}</p>
        <SaveButton onClick={handleSavePet}>Save to Profile</SaveButton>
      </Card>
    </Container>
  );
};

export default PetDetails;

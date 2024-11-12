import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import Auth from '../utils/auth';

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

export const REMOVE_PET_FROM_USER = gql`
  mutation RemovePetFromUser($petId: ID!) {
    removePetFromUser(petId: $petId) {
      _id
      username
      email
      pets {
        _id
        name
        type
        age
        color
        description
        image
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      _id
      username
      email
      pets {
        _id
        name
        type
        age
        color
        description
        image
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh; /* Full height for centering */
  background-color: #f0e6d2; /* Light background color */
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
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading: loadingPet,
    error: errorPet,
    data: petData,
  } = useQuery(GET_PET_BY_ID, {
    variables: { id },
  });
  const { loading: loadingUser, data: userData } = useQuery(GET_USER);
  const [savePetToProfile] = useMutation(SAVE_PET_TO_PROFILE);
  const [removePetFromUser] = useMutation(REMOVE_PET_FROM_USER);
  const [isSaved, setIsSaved] = useState(false); // State to track if the pet is saved

  useEffect(() => {
    if (userData && userData.user && userData.user.pets) {
      const savedPetIds = userData.user.pets.map((pet) => pet._id);
      setIsSaved(savedPetIds.includes(id)); // Check if the current pet ID is in the user's saved pets
    }
  }, [userData, id]);

  if (loadingPet) return <p>Loading pet details...</p>;
  if (errorPet) return <p>Error fetching pet details: {errorPet.message}</p>;
  if (loadingUser) return <p>Loading user data...</p>;

  const { name, type, age, description, image } = petData.getPetById;

  // saves pet to profile on button click
  const handleSavePet = async () => {
    // redirects to login page if user is not logged in
    if (!Auth.loggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const response = await savePetToProfile({ variables: { id } });
      console.log(response);
      if (response.data.savePetToProfile.success) {
        setIsSaved(true); // Update the state to indicate the pet is saved
        alert('Pet saved to your profile!');
      } else {
        alert(response.data.savePetToProfile.message);
      }
    } catch (err) {
      console.error('Error saving pet to profile:', err);
      alert('Failed to save pet. Please try again.');
    }
  };

  // removes pet from profile on button click
  const handleRemovePet = async () => {
    if (!Auth.loggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const response = await removePetFromUser({ variables: { petId: id } });
      console.log(response);
      if (response.data.removePetFromUser) {
        setIsSaved(false);
        alert('Pet removed from your profile!');
      } else {
        alert('Failed to remove pet. Please try again.');
      }
    } catch (err) {
      console.error('Error removing pet from profile:', err);
      alert('Failed to remove pet. Please try again.');
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
        <SaveButton onClick={isSaved ? handleRemovePet : handleSavePet}>
          {isSaved ? 'Remove from Profile' : 'Save to Profile'}
        </SaveButton>
      </Card>
    </Container>
  );
};

export default PetDetails;

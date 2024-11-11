import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';
import styled from '@emotion/styled';
import PetCard from '../components/PetCard';

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

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  padding-top: 100px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin-right: 40px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
`;

const Bio = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
  text-align: center;
  max-width: 700px;
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #777;
  text-align: center;
`;

const PetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;
// Array of random bios
const bios = [
  'A passionate animal lover who enjoys spending time with all creatures, big and small. Dedicated to rescuing and caring for pets of all kinds, always looking for new furry friends.',

  'An avid pet lover with a special place in their heart for animals in need. "Lives by the motto: The more pets, the merrier! and can never resist a wagging tail or a soft purr."',

  'A true animal enthusiast who believes that pets make a house a home. Firmly believes that animals bring out the best in us, and is always ready to share love with a furry friend.',
];

const getRandomBio = () => {
  const randomIndex = Math.floor(Math.random() * bios.length);
  return bios[randomIndex];
};

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <Message>Loading profile...</Message>;
  if (error) return <Message>Error: {error.message}</Message>;
  const randomBio = getRandomBio();
  return (
    <ProfileContainer>
      <LeftSection>
        <ProfileCard
          key={data.user._id}
          username={data.user.username}
          email={data.user.email}
          pets={data.user.pets}
        />
      </LeftSection>

      <RightSection>
        <Bio>{randomBio}</Bio>
        {data.user.pets.length === 0 ? (
          <Message>No pets added to your profile yet.</Message>
        ) : (
          <PetsContainer>
            {data.user.pets.map((pet) => (
              <PetCard
                key={pet._id}
                id={pet._id}
                name={pet.name}
                type={pet.type}
                age={pet.age}
                color={pet.color}
                description={pet.description}
                image={pet.image}
              />
            ))}
          </PetsContainer>
        )}
      </RightSection>
    </ProfileContainer>
  );
};

export default Profile;

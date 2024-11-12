import React, { useEffect } from 'react';
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

const PageContainer = styled.div`
  background-color: #f0e6d2; /* Blue background for the entire page */
  padding-top: 20px; /* Space from the top, can adjust as needed */
  min-height: 100vh; /* Ensure it covers the full height */
  justify-content: center;
  margin-top: 200px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-around; /* Spaces left and right evenly */
  align-items: flex-start;
  padding: 40px 20px;
  max-width: 80%;
  width: 100%; /* Ensure it uses full available width */
  margin: 0 auto;
  gap: 20px;
`;
const LeftSection = styled.div`
  flex: 1; /* Makes the left section take up 40% of the space */
  max-width: 40%; /* Ensures a consistent 40% width */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px;
  background-color: #61dafb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const RightSection = styled.div`
  flex: 1.5; /* Makes the right section take up 60% of the space */
  max-width: 60%; /* Ensures a consistent 60% width */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: #61dafb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Bio = styled.p`
  font-size: 2em;
  color: #333;
  margin: 10px 0;
  text-align: center;
  max-width: 700px;
  padding: 10px;
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin-top: 20px;
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
  'An avid pet lover with a special place in their heart for animals in need. "Lives by the motto: The more pets, the merrier!" and can never resist a wagging tail or a soft purr.',
  'A true animal enthusiast who believes that pets make a house a home. Firmly believes that animals bring out the best in us, and is always ready to share love with a furry friend.',
];

const getRandomBio = () => {
  const randomIndex = Math.floor(Math.random() * bios.length);
  return bios[randomIndex];
};

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER);

  // Trigger a "refresh" of data after it has been loaded successfully
  useEffect(() => {
    if (data) {
      // Here we refetch the data after it is loaded (like a "refresh")
      refetch();
    }
  }, [data, refetch]); // This effect runs only when `data` is available

  if (loading) return <Message>Loading profile...</Message>;
  if (error) return <Message>Error: {error.message}</Message>;
  const randomBio = getRandomBio();

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default Profile;

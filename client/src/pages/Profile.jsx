import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';
import styled from '@emotion/styled';

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
      }
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  padding-top: 100px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  color: #2c3e50; /* Darker, professional color */
  margin-bottom: 30px;
  letter-spacing: 1px; /* Slightly increased letter spacing for elegance */
  text-align: center;
  text-transform: uppercase; /* Make it look more refined */
  padding: 20px;
  background: linear-gradient(
    45deg,
    #f39c12,
    #e74c3c
  ); /* Gradient background */
  color: white; /* White text on gradient background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  width: 80%; /* To make the header fit the content */
  max-width: 900px; /* Limit the width */
  margin-top: 50px; /* Give it space from the top of the page */
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
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

const Message = styled.p`
  font-size: 1.2em;
  color: #777;
`;

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <Message>Loading profile...</Message>;
  if (error) return <Message>Error: {error.message}</Message>;

  return (
    <ProfileContainer>
      <Header>Hello Welcome To My Profile!</Header>

      <ProfileCard
        key={data.user._id}
        username={data.user.username}
        email={data.user.email}
        pets={data.user.pets}
      />
      <Message>No pets added to your profile yet.</Message>
      <PetsContainer>
        {data.user.pets.length > 0 ? (
          data.user.pets.map((pet) => (
            <ProfileCard key={pet._id} name={pet.name} type={pet.type} />
          ))
        ) : (
          <Message>No pets added to your profile yet.</Message>
        )}
      </PetsContainer>
    </ProfileContainer>
  );
};

export default Profile;

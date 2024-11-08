import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';
import styled from '@emotion/styled';
import { GET_USER_PROFILE } from '../utils/queries';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 80px;
  background-color: #f9f9f9;
`;

const PetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const Profile = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: '672d2d7111974fc11284fc95' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  const profile = data?.getUserProfile || {};

  return (
    <ProfileContainer>
      <ProfileCard user={profile} />
      <h2>Pets</h2>
      <PetsContainer>
        {/* {profile.pets.map((pet) => ( */}
        <ProfileCard user={profile} />
        {/* ))} */}
      </PetsContainer>
    </ProfileContainer>
  );
};

export default Profile;

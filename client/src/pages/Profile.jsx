import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import ProfileCard from "../components/ProfileCard";
import styled from "@emotion/styled";

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

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  {/* Use data.user.username or whatever you're trying to access */}
  
  return (
    <ProfileContainer>
      <ProfileCard key={data.user._id} username={data.user.username} email={data.user.email} pets={data.user.pets}/>
    </ProfileContainer>
  );
};

export default Profile;

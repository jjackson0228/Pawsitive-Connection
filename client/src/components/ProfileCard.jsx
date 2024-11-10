import React from 'react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
`;

const Username = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin: 10px 0;
`;

const Bio = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
`;

const Details = styled.p`
  font-size: 0.9em;
  color: #777;
  margin: 5px 0;
`;

const ProfileCard = ({ username, email, pets }) => {
  return (
    <CardContainer>
      {/* You can add an Avatar if you have a URL for it */}
      {/* <Avatar src={avatarUrl} alt={`${username}'s avatar`} /> */}
      <Username>{username}</Username>
      <Bio>{email}</Bio>
      {/* You can add more details if needed */}
      <Details></Details>
    </CardContainer>
  );
}

export default ProfileCard;


{/* CODE THAT WAS HERE BEFORE FIX:
const ProfileCard = ({ user }) => {
  return (
    <CardContainer>
      {/* {isUser && ( */}
      {/* <Avatar */}
      {/* src={profile.avatarUrl || profile.profileImage} */}
      {/* alt={`${profile.username || profile.name}'s avatar`} */}
      {/* /> */}
      {/* )} */}
      {/*<p>{user.username || user.email}</p>*/}
      {/* {profile.bio && <Bio>{profile.bio}</Bio>}
      {profile.location && (
        <Details>
          <strong>Location:</strong> {profile.location}
        </Details>
      )} */}
      {/* {profile.favoritePet && (
        <Details>
          <strong>Favorite Pet:</strong> {profile.favoritePet}
        </Details>
      )}
      {profile.age && (
        <Details>
          <strong>Age:</strong> {profile.age}
        </Details>
      )}
      {profile.type && (
        <Details>
          <strong>Type:</strong> {profile.type}
        </Details>
      )}
      {profile.color && (
        <Details>
          <strong>Color:</strong> {profile.color}
        </Details>
      )} */}{/*
    </CardContainer>
  );
}; */}

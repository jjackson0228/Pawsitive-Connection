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
  font-size: 2em;
  font-weight: 800;
  color: #2c3e50;
  margin: 15px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const Bio = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
`;

const avatarUrls = [
  'https://robohash.org/mail@ashallendesign.co.uk',
  'http://placekitten.com/250/250',
  'http://placebear.com/250/250',
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarUrls.length);
  return avatarUrls[randomIndex];
};

const ProfileCard = ({ username, email }) => {
  const avatarUrl = getRandomAvatar(); // Get the URL once

  return (
    <CardContainer>
      <Avatar src={avatarUrl} alt={`${username}'s avatar`} />
      <Username>{username}</Username>
      <Bio>{email}</Bio>
    </CardContainer>
  );
};

export default ProfileCard;

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

const Header = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  padding: 20px;
  background: linear-gradient(45deg, #f39c12, #e74c3c);
  color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 900px;
  margin-top: 50px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
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

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <Message>Loading profile...</Message>;
  if (error) return <Message>Error: {error.message}</Message>;

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
        <Bio>
          Hi, I'm Sarah, a dedicated animal lover and passionate advocate for
          pet adoption. My journey with animals began at a young age when I
          realized how many wonderful pets were waiting for loving homes. Over
          the years, I've adopted several furry friends, and each one has taught
          me something new about loyalty, love, and compassion. I’m particularly
          drawn to giving older pets and those with special needs a second
          chance. There's nothing more rewarding than seeing a rescued animal
          blossom in a home full of love and care. When I'm not volunteering at
          the local shelter or fostering pets, you can find me exploring new
          parks with my dogs, attending adoption events, or sharing stories
          about pet adoption to inspire others. I believe every pet deserves a
          forever home, and I'm here to help spread the word about the
          incredible impact adoption can have!
        </Bio>
        {data.user.pets.length === 0 ? (
          <Message>No pets added to your profile yet.</Message>
        ) : (
          <PetsContainer>
            {data.user.pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </PetsContainer>
        )}
      </RightSection>
    </ProfileContainer>
  );
};

export default Profile;

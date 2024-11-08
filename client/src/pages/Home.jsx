import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  margin-top: 150px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.2em;
  line-height: 1.5;
`;

const AdoptButton = styled.button`
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 1.5em;
  color: white;
  background-color: #4da3d1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3b8cbf;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    navigate("/pets"); // Redirect to the /pets page
  };

  return (
    <Container>
      <Title>Welcome to Pawsitive Connection!</Title>
      <Description>
        At Pawsitive Connection, we believe that every pet deserves a loving
        home. Explore our wonderful selection of furry friends waiting for their
        forever families. Whether you're looking for a playful puppy, a cuddly
        kitten, or a loyal companion, we have the perfect pet for you! Join us
        in making a difference—adopt, don't shop!
      </Description>
      <AdoptButton onClick={handleAdoptClick}>Adopt</AdoptButton>
    </Container>
  );
}

import React from "react";
import Signup from "../pages/Signup";
import styled from "@emotion/styled";



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #f0f2f5; /* Light background color */
`;

const Card = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px; /* Fixed width for the card */
  text-align: center; /* Center text */
`;

const Title = styled.h2`
  margin-bottom: 20px; /* Space below the title */
  color: #333; /* Darker color for the title */
`;

const SignupPage = () => {
  return (
    <Container>
      <Card>
        <Title>Sign Up</Title>
        <Signup />
      </Card>
    </Container>
  );
};

export default SignupPage;

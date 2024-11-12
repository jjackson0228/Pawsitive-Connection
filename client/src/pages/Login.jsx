import { css } from '@emotion/react';
import styled from '@emotion/styled';
import LoginForm from '../components/LoginForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  background-color: ; /* Tan */
  margin-top: 100px;
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

export default function Login() {
  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <LoginForm />
      </Card>
    </Container>
  );
}

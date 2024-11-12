import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error }] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER); // Add the login mutation
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign up the user
      const { data } = await addUser({ variables: { ...formData } });

      // Automatically log in the user
      const { email, password } = formData; // Use email and password
      const mutationResponse = await loginUser({
        variables: { email, password },
      });

      const token = mutationResponse.data.login.token; // Get the token from the response
      Auth.login(token); // Use your Auth utility to log in the user

      // Redirect to the home page
      navigate('/'); // Adjust the path as necessary for your home page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <Button type="submit">Register</Button>
      {error && <p>Error: {error.message}</p>}
    </Form>
  );
};

export default Signup;

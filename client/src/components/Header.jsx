// Import dependencies
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import Auth from '../utils/auth';
// Tan color variable for reuse
const tanColor = '#f0e6d2';
// Styled Header container
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 2rem 2rem;
  background-color: #282c34;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

// Styled Logo with paw prints
const LogoWrapper = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2rem; /* Increase font size for "Pawsitive Connection" */
  margin: 0;
  color: #61dafb; /* Keep main title color */
  gap: 0.5rem;

  img {
    width: 32px; /* Make paw prints bigger */
    height: 32px;
    filter: brightness(0) saturate(100%) invert(80%) sepia(15%) saturate(500%)
      hue-rotate(25deg) brightness(90%) contrast(90%);
    /* Apply tan color filter */
  }
`;

// Navbar container
const NavbarContainer = styled.nav`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

// Link styling (using NavLink from react-router-dom)
const StyledNavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: #f0e6d2;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1.1rem; /* Slightly larger font size for navigation links */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #61dafb;
    color: #282c34;
  }
`;
// Button Styling
const Button = styled.button`
  background-color: #61dafb;
  border: none;
  padding: 0.5rem 1rem;
  color: #282c34;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4fa3d1;
  }
`;

// Main Header Component
const HeaderComponent = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  // Toggle login/logout logic
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Logout the user and redirect to the home page
      Auth.logout();
      setIsLoggedIn(false);
      navigate('/'); // Redirect to home page after logout
    } else {
      // Redirect to login page when user is not logged in
      navigate('/login');
    }
  };

  useEffect(() => {
    // Update the login state whenever the token changes
    setIsLoggedIn(Auth.loggedIn());
  }, [isLoggedIn]);

  return (
    <HeaderContainer>
      <LogoWrapper>
        <img src="/paw-print.png" alt="Paw print" />
        Pawsitive Connection
        <img src="/paw-print.png" alt="Paw print" />
      </LogoWrapper>
      <NavbarContainer>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to={isLoggedIn ? '/profile' : '/login'}>
          Profile
        </StyledNavLink>
        <StyledNavLink to="/pets">Pets</StyledNavLink>
        <StyledNavLink to="/shelters">Shelters</StyledNavLink>
        {/* Conditionally render Login/Logout button */}
        <Button onClick={handleLoginLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </NavbarContainer>
    </HeaderContainer>
  );
};

export default HeaderComponent;

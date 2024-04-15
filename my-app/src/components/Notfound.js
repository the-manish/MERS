// NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the 404 page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #46703b;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  background-color: #46703b;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #355028;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <Description>Oops! The page you are looking for does not exist.</Description>
      <StyledLink to="/">Go back to Home</StyledLink>
    </Container>
  );
};

export default NotFound;

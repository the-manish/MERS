import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/logo.png'

// Styled components for the navbar elements
const Nav = styled.nav`
  background-color: #46703b;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 40px;
  padding-right: 54px;
`;

const Ul = styled.ul`
  list-style-type: none;
  width: 100vw;
  display: flex; 
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #F5F5DC;
  text-decoration: none; 
  font-weight: bold; 
  font-size: 20px;
  &:hover{
    background-color: transparent; 
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <StyledLink to="/"><img src={logo} alt="Robot Logo" height='60px' width='60px'/></StyledLink>

        <StyledLink to="/Dashboard">Dashboard</StyledLink>
        <StyledLink to="/Exercise">Exercise</StyledLink>
        <StyledLink to="/Movie">Movie</StyledLink>
        <StyledLink to="/Login">Profile</StyledLink>
      </Ul>
    </Nav>
  );
};

export default Navbar;

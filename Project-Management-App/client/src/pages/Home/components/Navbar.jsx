import React from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Container = styled.div`
  width: 90%;
  max-width: 1320px;
  height: 60px;
  margin: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 8px;
  @media (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #e67e22; /* Orange */
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  color: #ecf0f1; /* Gris clair */
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #e67e22; /* Orange */
  }
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: #e67e22; /* Orange */
  border: none;
  color: #fff;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #d35400; /* Orange foncé */
  }
`;

const Navbar = ({ setSignInOpen }) => {
  return (
    <Container>
      <Logo>WorkWise</Logo>
      <Menu>
        <MenuItem href="#home">Accueil</MenuItem>
        <MenuItem href="#features">Fonctionnalités</MenuItem>
        <MenuItem href="#benefits">Avantages</MenuItem>
        <MenuItem href="#team">Équipe</MenuItem>
      </Menu>
      <Button onClick={() => setSignInOpen(true)}>
        <AccountCircleOutlinedIcon style={{ color: '#fff' }} /> Connexion
      </Button>
    </Container>
  );
}

export default Navbar;

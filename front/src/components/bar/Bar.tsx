import { googleLogout } from '@react-oauth/google';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { ADD_CARDS, CARDS } from '../../constants/routePaths';
import { UserInformationContext } from '../../contexts/userContext';
import { PokeButton } from '../button/Button';
import Navbar from 'react-bootstrap/Navbar';
import { THEME_ONE } from '../../constants/colors';

export const NavBar = () => {
  const navigate = useNavigate();
  const userInformation = useContext(UserInformationContext);

  const logout = () => {
    userInformation.setUserData(undefined);
    googleLogout();
  };

  return (
    <PokeNavbar
      expand="lg"
      className="px-3"
    >
      <PokeNavbarTitle>Pokemon App</PokeNavbarTitle>
      <BarButtons className="justify-content-end">
        <PokeButton
          text="Add Card"
          onClick={() => {
            navigate(ADD_CARDS);
          }}
        />
        <PokeButton
          text="View Cards"
          onClick={() => {
            navigate(CARDS);
          }}
        />
        <PokeButton
          text="Logout"
          onClick={logout}
        />
      </BarButtons>
    </PokeNavbar>
  );
};

const BarButtons = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const PokeNavbarTitle = styled(Navbar.Brand)`
  color: white;
`;

const PokeNavbar = styled(Navbar)`
  background-color: ${THEME_ONE.barBackground};
`;

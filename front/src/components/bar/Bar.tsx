import { googleLogout } from '@react-oauth/google';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { THEME_ONE } from '../../constants/colors';
import { ADD_CARDS, CARDS } from '../../constants/routePaths';
import { UserInformationContext } from '../../contexts/userContext';
import { Button } from '../button/Button';

export const NavBar = () => {
  const navigate = useNavigate();
  const userInformation = useContext(UserInformationContext);

  const logout = () => {
    userInformation.setUserData(undefined);
    googleLogout();
  };

  return (
    <Bar>
      <h1>Pokemon App </h1>
      <BarButtons>
        <Button
          text="Add Card"
          onClick={() => {
            navigate(ADD_CARDS);
          }}
        />
        <Button
          text="View Cards"
          onClick={() => {
            navigate(CARDS);
          }}
        />
        <Button
          text="Logout"
          onClick={logout}
        />
      </BarButtons>
    </Bar>
  );
};

const BarButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 50vh;
  justify-content: space-around;
  align-items: center;
  height: 40px;
`;

const Bar = styled.div`
  background-color: ${THEME_ONE.barBackground};
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-botton: 5px;
  height: 60px;
  margin-bottom: 10px;
`;

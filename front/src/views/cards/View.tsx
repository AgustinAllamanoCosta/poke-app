import styled from 'styled-components';
import { useCallback, useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { INDEX } from '../../constants/routePaths';

const CardsView = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate(INDEX);
  }, [userInformation.userData]);

  return (
    <Container>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default CardsView;

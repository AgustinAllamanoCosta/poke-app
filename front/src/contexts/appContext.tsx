import styled, { createGlobalStyle } from 'styled-components';
import { ReactNode } from 'react';
import ErrorContext from '../components/userError/useError';
import UserContext from '../components/useUserInformation/useUserInformation';
import GoogleAuthContext from '../components/useGoogleAuth/useGoogleAuth';
import { configuration } from '../config/appConfig';
import { THEME_ONE } from '../constants/colors';

type AppContextProps = {
  children: ReactNode;
};

const AppContext = ({ children }: AppContextProps) => {
  return (
    <AppContainer>
      <GlobalStyles />
      <ErrorContext>
        <UserContext>
          <GoogleAuthContext clientId={configuration.clientId}>
            {children}
          </GoogleAuthContext>
        </UserContext>
      </ErrorContext>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${THEME_ONE.backgorund};
    color: ${THEME_ONE.fontColor};
    font-family: 'Iner';
    margin: 0px;
  }
`;

export default AppContext;

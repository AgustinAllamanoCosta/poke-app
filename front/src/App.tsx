import { Routes, Route, useNavigate } from 'react-router-dom';
import ErrorView from './views/error/Error';
import { useCallback, useContext, useState } from 'react';
import { BATTLE, INDEX, OTHER, CARDS, ADD_CARDS } from './constants/routePaths';
import RequireAuth from './components/auth/RequireAuth';
import CardsView, { PokeCard } from './views/cards/View';
import BattleView from './views/battle/View';
import AppContext from './contexts/appContext';
import LoginView from './views/login/Login';
import AddCardsView from './views/cards/Add';
import { googleLogout } from '@react-oauth/google';
import { UserInformationContext } from './contexts/userContext';
import { Button } from './components/button/Button';
import { ServerStyleSheet, styled } from 'styled-components';
import { THEME_ONE } from './constants/colors';

const App = () => {
  const navigate = useNavigate();
  const [pokemonSelecteToBattle, setPokemonSelectedToBattle] = useState<PokeCard>({} as PokeCard);
  const userInformation = useContext(UserInformationContext);

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = useCallback(() => {
    navigate(INDEX);
  }, []);

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate(INDEX);
  }, [userInformation.userData]);

  return (
    <AppContext>
      <Bar>
        <h1>Pokemon App / Cards</h1>
        <BarButtons>
          <Button text='Add Card' onClick={()=>{ navigate(ADD_CARDS) }} />
          <Button text='View Cards' onClick={()=>{ navigate(CARDS) }} />
          <Button text='Logout' onClick={logOut} />
        </BarButtons>
      </Bar>
      <Routes>
        <Route
          path={INDEX}
          element={<LoginView />}
        />
        <Route
          path={BATTLE}
          element={
            <RequireAuth>
              <BattleView pokemonCard={pokemonSelecteToBattle}/>
            </RequireAuth>
          }
        />
        <Route
          path={CARDS}
          element={
            <RequireAuth>
              <CardsView selectPokemon={setPokemonSelectedToBattle} />
            </RequireAuth>
          }
        />
        <Route
          path={ADD_CARDS}
          element={
            <RequireAuth>
              <AddCardsView />
            </RequireAuth>
          }
        />
        <Route
          path={OTHER}
          element={
            <ErrorView
              onClick={goToIndex}
              message={defaultRouteMessage}
            />
          }
        />
      </Routes>
    </AppContext>
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

export default App;

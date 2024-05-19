import { Routes, Route, useNavigate } from 'react-router-dom';
import ErrorView from './views/error/Error';
import { useCallback, useState } from 'react';
import { BATTLE, INDEX, OTHER, CARDS, ADD_CARDS } from './constants/routePaths';
import RequireAuth from './components/auth/RequireAuth';
import CardsView, { PokeCard } from './views/cards/View';
import BattleView from './views/battle/View';
import AppContext from './contexts/appContext';
import LoginView from './views/login/Login';
import AddCardsView from './views/cards/Add';

const App = () => {
  const navigate = useNavigate();
  const [pokemonSelecteToBattle, setPokemonSelectedToBattle] = useState<PokeCard>({} as PokeCard);

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = useCallback(() => {
    navigate(INDEX);
  }, []);

  return (
    <AppContext>
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
export default App;

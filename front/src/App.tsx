import { Routes, Route, useNavigate } from 'react-router-dom';
import ErrorView from './views/error/Error';
import { lazy, useCallback } from 'react';
import { BATTLE, INDEX, OTHER, CARDS } from './constants/routePaths';
import RequireAuth from './components/auth/RequireAuth';

const CardsView = lazy(() => import('./views/cards/View'));
const BattleView = lazy(() => import('./views/battle/View'));
const LoginViewLazy = lazy(() => import('./views/login/Login'));
const AppContext = lazy(() => import('./contexts/appContext'));

const App = () => {
  const navigate = useNavigate();

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
          element={<LoginViewLazy />}
        />
        <Route
          path={BATTLE}
          element={
            <RequireAuth>
              <BattleView />
            </RequireAuth>
          }
        />
        <Route
          path={CARDS}
          element={
            <RequireAuth>
              <CardsView />
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

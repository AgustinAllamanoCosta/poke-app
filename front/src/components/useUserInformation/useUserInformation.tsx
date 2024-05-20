import { useState, ReactNode, useEffect } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { PokeCard, UserData } from '../../types/types';

const UserContext = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | undefined>();
  const [cards, setCards] = useState<PokeCard[]>([]);
  const key: string = 'poke-app';

  const saveUserDataInApp = (userData: UserData | undefined) => {
    localStorage.setItem(key, JSON.stringify(userData));
    setUserData(userData);
  };

  useEffect(() => {
    const rawLocalData: string | null | undefined= localStorage.getItem(key);
    if (rawLocalData && rawLocalData != 'undefined') {
      saveUserDataInApp(JSON.parse(rawLocalData));
    }
  }, []);

  const userInformationContextValue = {
    userData,
    cards,
    setUserData: saveUserDataInApp,
    setCards: setCards,
  };

  return (
    <UserInformationContext.Provider value={userInformationContextValue}>
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserContext;

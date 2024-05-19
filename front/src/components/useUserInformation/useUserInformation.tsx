import { useState, ReactNode, useMemo, useEffect } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { UserData } from '../../types/types';
import { PokeCard } from '../../views/cards/View';

const UserContext = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>();
  const [cards, setCards ] = useState<PokeCard[]>([]);
  const key: string = 'poke-app';

  const saveUserDataInApp = (userData: UserData | undefined) => {
    localStorage.setItem(key, JSON.stringify(userData));
    setUserData(userData);
  };

  useEffect(()=>{
    const rawLocalData: string | null = localStorage.getItem(key);
    if(rawLocalData){
      saveUserDataInApp(JSON.parse(rawLocalData));
    }
  },[]);

  const userInformationContextValue = useMemo(
    () => ({
      userData,
      cards,
      setUserData: saveUserDataInApp,
      setCards: setCards
    }),
    [userData, cards],
  );

  return (
    <UserInformationContext.Provider value={userInformationContextValue}>
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserContext;

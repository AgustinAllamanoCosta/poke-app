import { createContext } from 'react';
import { UserData } from '../types/types';
import { PokeCard } from '../views/cards/View';

export const UserInformationContext = createContext<{
  userData: UserData | undefined;
  cards: PokeCard[]
  setUserData: (e: UserData | undefined) => void;
  setCards: (e: PokeCard[])=> void;
}>({
  userData: undefined,
  cards: [],
  setUserData: (e: UserData | undefined) => {},
  setCards: (e: PokeCard[] ) => {}
});

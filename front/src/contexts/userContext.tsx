import { createContext } from 'react';
import { PokeCard, UserData } from '../types/types';

export const UserInformationContext = createContext<{
  userData: UserData | undefined;
  cards: PokeCard[];
  setUserData: (e: UserData | undefined) => void;
  setCards: (e: PokeCard[]) => void;
}>({
  userData: undefined,
  cards: [],
  setUserData: (e: UserData | undefined) => {},
  setCards: (e: PokeCard[]) => {},
});

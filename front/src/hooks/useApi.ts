import axios from 'axios';
import { useContext } from 'react';
import { configuration } from '../config/appConfig';
import { UserInformationContext } from '../contexts/userContext';
import { NewCard, PokeCard } from '../types/types';

export const useAPI = () => {
  const userInformation = useContext(UserInformationContext);

  const getUserCards = async () => {
    console.group('User Crads');
    console.debug('userid', userInformation.userData?.id);
    const backResponse = await axios.get<PokeCard[]>(
      `${configuration.backendURL}/cards/user/${userInformation.userData?.id}`,
      {
        headers: {
          authorization: `Bearer ${userInformation.userData?.accessToken}`,
        },
      },
    );
    if (backResponse.data) {
      console.debug('back response', backResponse.data);
      console.groupEnd();
      return backResponse.data;
    } else {
      console.debug('back data is undeifned');
      console.groupEnd();
      return [];
    }
  };

  const registerUser = async (access_token: string) => {
    console.group('Register User');
    console.debug('Regiter new user');
    const backResponse = await axios.post(
      `${configuration.backendURL}/register`,
      { email: 'agustinallamanocosta@gmail.com' },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      },
    );
    console.groupEnd();
    return backResponse.data;
  };

  const addNewCard = async (newCard: NewCard) => {
    console.group('Add new Card');
    console.debug('Card to add ', newCard);
    const backResponse = await axios.post(
      `${configuration.backendURL}/cards`,
      { ...newCard, userId: userInformation.userData?.id },
      {
        headers: {
          Authorization: `Bearer ${userInformation.userData?.accessToken}`,
          Accept: 'application/json',
        },
      },
    );
    console.debug('Back response ', backResponse.data);
    console.groupEnd();
    return backResponse.data;
  };

  const battle = async (challengesPokemonId: string, rivalName: string) => {
    console.group('Battle ');
    console.debug('between ', challengesPokemonId, rivalName);
    const backResponse = await axios.get(
      `${configuration.backendURL}/battle/${challengesPokemonId}`,
      {
        headers: {
          Authorization: `Bearer ${userInformation.userData?.accessToken}`,
          Accept: 'application/json',
        },
        params: { rival: rivalName },
      },
    );
    console.debug('battle result ', backResponse.data);
    console.groupEnd();
    return backResponse.data;
  };

  return { getUserCards, registerUser, addNewCard, battle };
};

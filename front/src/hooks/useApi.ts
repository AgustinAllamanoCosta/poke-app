import axios from 'axios';
import { useContext } from 'react';
import { UserInformationContext } from '../contexts/userContext';
import { NewCard } from '../views/cards/Add';
import { PokeCard } from '../views/cards/View';

export const useAPI = () => {
  const userInformation = useContext(UserInformationContext);

  const getUserCards = async () => {
    console.group('User Crads');
    console.debug('userid', userInformation.userData?.id);
    const backResponse = await axios.get(
      `http://localhost:3000/cards/user/${userInformation.userData?.id}`,
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
      'http://localhost:3000/register',
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

  const addNewCard = async (newCard: NewCard ) => {
    console.group('Add new Card');
    console.debug('Card to add ', newCard);
    const backResponse = await axios.post(
      'http://localhost:3000/cards',
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

  return { getUserCards, registerUser, addNewCard };
};

import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useCallback, useContext, useEffect } from 'react';
import { UserData } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { UserInformationContext } from '../contexts/userContext';
import { useAPI } from './useApi';

export const useGoogleLoginActions = (redirectPath: string) => {
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const { registerUser } = useAPI();

  const loginGoogle = useCallback(
    useGoogleLogin({
      onSuccess: async (codeResponse: any) => {
        const googleResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json',
            },
          },
        );
        const backResponse = await registerUser(codeResponse.access_token);
        const newUser: UserData = {
          id: backResponse.id,
          name: googleResponse.data.name,
          photoURL: googleResponse.data.picture,
          accessToken: codeResponse.access_token,
        };
        userInformation.setUserData({ ...newUser });
      },
      onError: (error) => {
        console.group('Login Error');
        console.error('Login Failed:', error);
        console.groupEnd();
        userInformation.setUserData(undefined);
      },
    }),
    [userInformation.userData],
  );

  useEffect(() => {
    const userId: string | undefined = userInformation.userData?.id;
    if (userId) navigate(redirectPath);
  }, [userInformation.userData]);

  return {
    loginGoogle,
  };
};

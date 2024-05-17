import { useState, ReactNode, useMemo } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { UserData } from '../../types/types';

const UserContext = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>();

  const saveUserDataInApp = (userData: UserData | undefined) => {
    setUserData(userData);
  };

  const userInformationContextValue = useMemo(
    () => ({
      userData,
      setUserData: saveUserDataInApp,
    }),
    [userData],
  );

  return (
    <UserInformationContext.Provider value={userInformationContextValue}>
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserContext;

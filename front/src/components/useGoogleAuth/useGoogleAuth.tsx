import { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorView from '../../views/error/Error';

const GoogleAuthContext = ({
  children,
  clientId,
}: {
  children: ReactNode;
  clientId: string | undefined;
}) => {
  return (
    <>
      {clientId ? (
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
      ) : (
        <ErrorView
          onClick={() => {
            console.error('Faltal error!');
          }}
          message="Looks like a env variable is missing clientId"
        />
      )}
    </>
  );
};

export default GoogleAuthContext;

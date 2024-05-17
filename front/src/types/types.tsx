export type UserData = {
  id: string | undefined;
  name: string;
  photoURL: string;
  accessToken: string;
};

export type Configuration = {
  clientId: string | undefined;
  environment: string;
  id: string;
  backendURL: string;
  name: string;
};
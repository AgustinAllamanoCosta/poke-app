import { Configuration } from '../types/types';

export const configuration: Configuration = {
  clientId: import.meta.env.VITE_CLIENT_ID
    ? import.meta.env.VITE_CLIENT_ID
    : undefined,
  environment: import.meta.env.VITE_APP_ENV ? import.meta.env.VITE_APP_ENV : '',
  id: import.meta.env.VITE_ID ? import.meta.env.VITE_ID : '',
  name: import.meta.env.VITE_NAME ? import.meta.env.VITE_NAME : '',
  backendURL: import.meta.env.VITE_BACKEND_URL,
};

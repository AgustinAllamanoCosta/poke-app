import { Configuration } from '../types/types';

export const configuration: Configuration = {
  clientId: import.meta.env.VITE_CLIENT_ID
    ? import.meta.env.VITE_CLIENT_ID
    : undefined,
  environment: import.meta.env.VITE_APP_ENV ? import.meta.env.VITE_APP_ENV : '',
  backendURL: import.meta.env.VITE_BACK_URL,
};

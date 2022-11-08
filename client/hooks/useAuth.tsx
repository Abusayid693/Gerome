import {createContext, useContext} from 'react';

export const AuthContext = createContext<{
  currentUser: any;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAuthenticating: boolean;
  // @ts-ignore
}>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

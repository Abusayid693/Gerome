import {useRouter} from 'next/router';
import React, {useEffect, useMemo, useState} from 'react';
import {useCookies} from 'react-cookie';
import {useQuery} from 'react-query';
import {AuthServicesProtected} from '../../../packages/gerome-api';
import {AuthContext} from '../../hooks/useAuth';
import {COOKIE} from '../../util/cookie';

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  // [TODO] : take a look into react-query cache for current user
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [cookies, setCookie] = useCookies([COOKIE]);
  const router = useRouter();
  const api = useMemo(() => {
    return new AuthServicesProtected(cookies.GEROME_COOKIE);
  }, [cookies]);
  const {data, isLoading} = useQuery(
    'users',
    async () => {
      const {data} = await api.me();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      retryDelay: 3000,
      enabled: router.pathname !== '/login' && router.pathname !== '/signup' && !currentUser
    }
  );

  useEffect(() => {
    if (data) {
      setCurrentUser(data.data.user);
    }
  }, [isLoading]);

  const login = async (data: any) => {
    const {refreshToken, user} = data;
    setCurrentUser(user);
    setCookie(COOKIE, refreshToken, {path: '/'});
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCurrentUser(null);
  };

  const isAuthenticated = () => {
    return currentUser != null ? true : false;
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    isAuthenticating: isLoading
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

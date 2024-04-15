'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { PropsWithChildren } from '@/types/common';
import type { GetMeResponse, LoginPayload, LoginResponse, LogoutResponse } from '@/types/auth';
import type { User } from '@/types/user';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import type { TranslationKey } from '@/types/i18n';
import useIntl from '@/app/hooks/useIntl';
import { TOKEN_COOKIE_KEY } from '@/consts/auth';
import CookieService from '@/utils/cookieService';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import session from '@/app/api/[utils]/SessionClient';
import cookieService from '@/utils/cookieService';

type AuthContextValues = {
  isLoggedIn: boolean | undefined;
  user: User | null;
  login: (credentials: LoginPayload) => Promise<void>;
  loginApiError: string;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValues>({
  isLoggedIn: undefined,
  user: null,
  login: () => Promise.resolve(),
  loginApiError: '',
  logout: () => Promise.resolve(),
});

function useAuth() {
  return useContext(AuthContext);
}

function searchCookiesForToken(): string | null {
  return CookieService.get(TOKEN_COOKIE_KEY);
}

function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();
  const [loginApiError, setLoginApiError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const { t } = useIntl();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      session.logout();
      void logout();
    }
  }, [isLoggedIn]);

  const setCurrentUser = useCallback((data: User) => {
    setUser(data);
    setIsLoggedIn(true);
  }, []);

  const clearCurrentUser = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    router.push(dynamicRoute(Routes.home));
  }, []);

  const getMe = useCallback(async (signal: AbortSignal) => {
    try {
      const data = await api.get<GetMeResponse>(endpoints.me, { init: { signal } });
      setCurrentUser(data);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const token = searchCookiesForToken();
    const controller = new AbortController();

    if (token) {
      session.getData(token).then(() => getMe(controller.signal));
    }

    return () => {
      controller.abort();
    };
  }, [getMe]);

  const login = useCallback(async (credentials: LoginPayload) => {
    try {
      const data = await api.post<LoginPayload, LoginResponse>(endpoints.login, credentials);
      setCurrentUser(data);
    } catch (e: unknown) {
      const error = e as Error;
      setLoginApiError(t(error.message as TranslationKey));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post<undefined, LogoutResponse>(endpoints.logout);
      clearCurrentUser();
      cookieService.clear(TOKEN_COOKIE_KEY);
    } catch (e) {}
  }, []);

  const values: AuthContextValues = {
    isLoggedIn,
    user,
    login,
    loginApiError,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { useAuth };

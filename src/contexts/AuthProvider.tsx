'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { PropsWithChildren } from '@/types/common';
import type { GetMeResponse, LoginPayload, LoginResponse, LogoutResponse } from '@/types/auth';
import type { User } from '@/types/user';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import type { TranslationKey } from '@/types/i18n';
import { IS_LOGGED_COOKIE_KEY } from '@/consts/auth';
import CookieService from '@/utils/cookieService';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import session from '@/app/api/[utils]/SessionClient';

type AuthContextValues = {
  isLoggedIn: boolean | undefined;
  user: User | null;
  login: (credentials: LoginPayload) => Promise<void>;
  loginApiError: TranslationKey | undefined;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValues>({
  isLoggedIn: undefined,
  user: null,
  login: () => Promise.resolve(),
  loginApiError: undefined,
  logout: () => Promise.resolve(),
});

function useAuth() {
  return useContext(AuthContext);
}

function hasIsLoggedCookie(): boolean {
  return CookieService.get(IS_LOGGED_COOKIE_KEY) === 'true';
}

function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();
  const [loginApiError, setLoginApiError] = useState<TranslationKey | undefined>();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      session.logout();
      // void logout();
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
    const isLogged = hasIsLoggedCookie();
    const controller = new AbortController();

    if (isLogged) {
      getMe(controller.signal);
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
      setLoginApiError(error.message as TranslationKey);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post<undefined, LogoutResponse>(endpoints.logout);
      clearCurrentUser();
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

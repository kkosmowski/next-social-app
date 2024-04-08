'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { PropsWithChildren } from '@/types/common';
import type { GetMeResponse, LoginPayload, LoginResponse, User, UserModel } from '@/types/auth';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import type { TranslationKey } from '@/types/i18n';
import mapUserModelToUser from '@/utils/mapUserModelToUser';
import useIntl from '@/app/hooks/useIntl';
import { TOKEN_COOKIE_KEY } from '@/consts/auth';
import CookieService from '@/utils/cookieService';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';

type AuthContextValues = {
  isLoggedIn: boolean | undefined;
  me: User | null;
  login: (credentials: LoginPayload) => Promise<void>;
  loginApiError: string;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValues>({
  isLoggedIn: undefined,
  me: null,
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
  const [me, setMe] = useState<User | null>(null);
  const { t, localeCode } = useIntl();
  const router = useRouter();

  const setUser = useCallback((data: UserModel) => {
    setMe(mapUserModelToUser(data));
    setIsLoggedIn(true);
    router.push(dynamicRoute(Routes.home, { localeCode }));
  }, []);

  const getMe = useCallback(async () => {
    try {
      const data = await api.get<GetMeResponse>(endpoints.me, {
        init: { headers: { Authorization: CookieService.get(TOKEN_COOKIE_KEY) || '' } },
      });
      setUser(data);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const token = searchCookiesForToken();

    if (token) {
      void getMe();
    }
  }, [getMe]);

  const login = useCallback(async (credentials: LoginPayload) => {
    try {
      const data = await api.post<LoginPayload, LoginResponse>(endpoints.login, credentials);
      setUser(data);
    } catch (e: unknown) {
      const error = e as Error;
      setLoginApiError(t(error.message as TranslationKey));
    }
  }, []);

  const logout = useCallback(async () => {}, []);

  const values: AuthContextValues = {
    isLoggedIn,
    me,
    login,
    loginApiError,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { useAuth };

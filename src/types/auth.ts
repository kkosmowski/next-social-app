import type { Model } from './common';

export type User = Omit<Model, 'updated'> & {
  email: string;
  username: string;
  verified: boolean;
  avatarUrl: string;
  status: string;
  about: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = User;
export type LogoutResponse = void;
export type GetMeResponse = User;

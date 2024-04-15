import type { User } from './user';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = User;
export type LogoutResponse = void;
export type GetMeResponse = User;

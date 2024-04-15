import type { Model } from '@/types/common';

export type User = Omit<Model, 'updated'> & {
  email: string;
  username: string;
  verified: boolean;
  avatarUrl: string;
  status: string;
  about: string;
};

export type GetUserResponse = User;

export type UserModel = {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  created: string;
  avatarUrl: string;
};

export type User = Omit<UserModel, 'created'> & {
  created: Date;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = UserModel;
export type LogoutResponse = void;
export type GetMeResponse = UserModel;

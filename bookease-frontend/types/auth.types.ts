export type AuthRole = 'ADMIN' | 'USER';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};

export type LoginData = {
  access_token: string;
  user: AuthUser;
};

export type LoginApiResponse = {
  success: true;
  data: LoginData;
  timestamp: string;
  path: string;
};

export type RegisterApiResponse = {
  success: true;
  data: AuthUser & {
    createdAt?: string;
  };
  timestamp: string;
  path: string;
};

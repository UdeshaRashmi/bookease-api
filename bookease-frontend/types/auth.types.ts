export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
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

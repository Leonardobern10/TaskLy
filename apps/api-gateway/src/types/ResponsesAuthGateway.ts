type UserResponse = {
  id: string;
  email: string;
  name: string;
};

export type ResponseLogout = {
  message: string;
};

export type ResponseLogin = {
  access_token: string;
  user: UserResponse;
};

export type ResponseRefresh = {
  access_token: string;
};

export type ResponseAuthController = {
  access_token: string;
  refresh_token?: string;
  user: UserResponse;
};

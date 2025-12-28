export const Routes = {
  AUTH: {
    DEFAULT_PATH: 'auth',

    LOGIN: {
      PATH: 'login',
      DESCRIPTION: { summary: 'Login user' },
      BODY_SCHEMA: {
        schema: { example: { email: 'joao@email.com', password: '123456' } },
      },
      RESPONSE_200: {
        description: 'User authenticated successfully',
        schema: {
          example: {
            access_token: 'jwt-access-token',
            refresh_token: 'jwt-refresh-token',
          },
        },
      },
      UNAUTHORIZED_401: { description: 'Invalid credentials' },
      BAD_REQUEST_400: { description: 'Invalid login data' },
    },

    REGISTER: {
      PATH: 'register',
      DESCRIPTION: { summary: 'Register new user' },
      BODY_SCHEMA: {
        schema: {
          example: {
            name: 'John Doe',
            email: 'john@email.com',
            password: '123456',
          },
        },
      },
      RESPONSE_201: {
        description: 'User successfully registered',
      },
      BAD_REQUEST_400: { description: 'Validation failed' },
      INTERNAL_500: { description: 'Unexpected error' },
    },

    PROFILE: {
      PATH: 'profile',
      DESCRIPTION: { summary: 'Return authenticated user profile' },
      RESPONSE_200: {
        description: 'Authenticated user',
      },
      UNAUTHORIZED_401: { description: 'Invalid or expired token' },
    },

    REFRESH: {
      PATH: 'refresh',
      DESCRIPTION: { summary: 'Refresh access token' },
      RESPONSE_200: {
        description: 'Token refreshed successfully',
      },
      BAD_REQUEST_400: { description: 'Invalid refresh token' },
    },

    LOGOUT: {
      PATH: 'logout',
      DESCRIPTION: { summary: 'Logout user' },
      RESPONSE_200: {
        description: 'User logged out successfully',
      },
      NOT_FOUND_404: { description: 'User not found' },
    },

    GET_ALL: {
      PATH: 'users',
      DESCRIPTION: { summary: 'List all users' },
      RESPONSE_200: {
        description: 'Users successfully returned',
      },
      NOT_FOUND_404: { description: 'Users not found' },
    },
  },
};

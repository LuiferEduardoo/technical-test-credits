import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const authUtils = {
  // Save token to cookie
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  },

  // Get token from cookie
  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  // Remove token from cookie
  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    return !!token;
  }
};

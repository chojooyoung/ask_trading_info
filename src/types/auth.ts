export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: ({
    isSucess,
    tokenData,
  }: {
    isSucess: boolean;
    tokenData: { accessToken: string; refreshToken: string };
    userData: {
      id: string;
      email: string;
    };
  }) => void;
  logoutUser: () => void;
  checkAuth: () => { isLogin: boolean };
}

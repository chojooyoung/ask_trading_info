export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: ({
    isSucess,
    token,
  }: {
    isSucess: boolean;
    token: string;
  }) => void;
  logoutUser: () => void;
  checkAuth: () => void;
}

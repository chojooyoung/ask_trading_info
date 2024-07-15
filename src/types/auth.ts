export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: ({ isSucess }: { isSucess: boolean }) => void;
  logoutUser: () => void;
  checkAuth: () => void;
}

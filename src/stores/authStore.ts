// stores/authStore.ts
import { AuthState } from "@/types/auth";
import create from "zustand";
import { getToken, removeToken, setToken } from "../utils/auth";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  loginUser: async ({ isSucess, token }) => {
    set({ isAuthenticated: isSucess });
    setToken(token);
  },

  logoutUser: () => {
    removeToken();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = getToken();
    if (token) {
      set({ isAuthenticated: true });
    }
  },
}));

export default useAuthStore;

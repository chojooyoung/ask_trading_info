// stores/authStore.ts
import { AuthState } from "@/types/auth";
import create from "zustand";
import { getToken, removeToken, setToken } from "../utils/auth";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  loginUser: async ({ isSucess }) => {
    set({ isAuthenticated: isSucess });
  },

  logoutUser: () => {
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = getToken("accessToken");
    if (token) {
      set({ isAuthenticated: true });
    }
  },
}));

export default useAuthStore;

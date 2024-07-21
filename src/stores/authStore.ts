// stores/authStore.ts
import { AuthState } from "@/types/auth";
import create from "zustand";
import { getItem, setItem, removeItem } from "@/utils/localStorage";
import { copyFileSync } from "fs";
import { logout } from "@/api/auth/logout";
// const [accessToken, setAccessToken, removeAccressToken] =
//   useLocalStorage<string>("access-token", "");

// const [refreshToken, setRefreshToken, removeRefreshToken] =
//   useLocalStorage<string>("refresh-token", "");

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  loginUser: async ({ isSucess, tokenData, userData }) => {
    if (isSucess) {
      setItem("access-token", tokenData?.accessToken);
      setItem("refresh-token", tokenData?.refreshToken);
      set({ user: userData, isAuthenticated: true });
    }
  },

  logoutUser: () => {
    removeItem("access-token");
    removeItem("refresh-token");
    logout();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    if (getItem("access-token")?.length > 0) {
      set({ isAuthenticated: true });
      return { isLogin: true };
    }
    return { isLogin: false };
  },
}));

export default useAuthStore;

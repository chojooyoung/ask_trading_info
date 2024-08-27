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
    console.log(userData);
    if (isSucess) {
      setItem("diary-access-token", tokenData?.accessToken);
      setItem("diary-refresh-token", tokenData?.refreshToken);
      setItem("userId", userData.id);
      set({ user: userData, isAuthenticated: true });
    }
  },

  logoutUser: () => {
    logout().then(() => {
      removeItem("diary-access-token");
      removeItem("diary-refresh-token");
      removeItem("userId");
      set({ user: null, isAuthenticated: false });
    });
  },

  checkAuth: () => {
    if (getItem("diary-access-token")?.length > 0) {
      set({ isAuthenticated: true });
      return { isLogin: true };
    }
    return { isLogin: false };
  },
}));

export default useAuthStore;

import { setCookie, getCookie, removeCookie } from "./cookie";

export function setToken(token: string, refreshToken: string): void {
  setCookie("front-token", token, 1);
  setCookie("fornt-refreshToken", refreshToken, 1);
}

export function getToken(key): string | null {
  return getCookie(key);
}

export function removeToken(): void {
  removeCookie("refreshToken");
  removeCookie("token");
}

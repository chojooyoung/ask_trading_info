import { setCookie, getCookie, removeCookie } from "./cookie";

export function setToken(token: string): void {
  setCookie("token", token, 1); // 30일 동안 유효
}

export function getToken(): string | null {
  return getCookie("token");
}

export function removeToken(): void {
  removeCookie("token");
}

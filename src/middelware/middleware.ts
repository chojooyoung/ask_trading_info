// middleware.ts
import useAuthStore from "@/stores/authStore";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginState = useAuthStore((state) => state.isAuthenticated);

  //   const isAuthenticated = checkAuth(request); // 인증 확인 함수 (구현 필요)
  const isAuthenticated = isLoginState;

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/profile/:path*",
};

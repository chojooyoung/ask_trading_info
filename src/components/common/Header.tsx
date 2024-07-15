"use client";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const isLogin = useAuthStore((state) => state.isAuthenticated);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isLogin);
  }, [isLogin]);

  const handleClickLogout = () => {
    logoutUser();
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            로고
          </Link>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="px-4 py-2 rounded hover:bg-gray-700"
              >
                내 정보
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="ml-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded hover:bg-gray-700"
              >
                로그인
              </Link>
              <Link
                href="/sign-up"
                className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

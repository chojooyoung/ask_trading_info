import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { LogoutRes, logout } from "@/api/auth/logout";

export const useLogout = (): UseMutationResult<LogoutRes, Error> => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("로그아웃 성공");
    },
    onError: (error: Error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};

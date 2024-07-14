import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, LoginData, LoginRes } from "@/api/auth/login";

export const useLogin = (): UseMutationResult<LoginRes, Error, LoginData> => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
    },
    onError: (error: Error) => {
      console.error("로그인 실패:", error);
    },
  });
};

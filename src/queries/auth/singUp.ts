import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiError, signUp, SignUpData, SingnUPRes } from "@/api/auth/signUp";

export const useSignUp = (): UseMutationResult<
  SingnUPRes,
  ApiError,
  SignUpData
> => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error: ApiError) => {
      console.error("회원가입 실패:", error);
    },
  });
};

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUp, SignUpData, SingnUPRes } from "@/api/auth/signUp";

export const useSignUp = (): UseMutationResult<
  SingnUPRes,
  Error,
  SignUpData
> => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error: Error) => {
      console.error("회원가입 실패:", error);
    },
  });
};

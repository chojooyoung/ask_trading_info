import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserInfo, UserInfoRes } from "@/api/auth/userInfo";

export const useGetUserInfo = (): UseQueryResult<UserInfoRes, Error> => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 60,
  });
};

import axios, { AxiosResponse } from "axios";
import { createApiInstance } from "@/api";

export type UserInfoRes = {
  message: string[];
  error: string;
  statusCode: number;
  id: string;
  email: string;
};

export const getUserInfo: () => Promise<UserInfoRes> = async () => {
  const api = createApiInstance();
  const response: AxiosResponse<UserInfoRes> = await api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    { withCredentials: true }
  );
  return response.data;
};

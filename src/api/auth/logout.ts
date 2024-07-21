import axios, { AxiosResponse } from "axios";
import { createApiInstance } from "@/api";

export type LogoutRes = {
  message: string[];
  error: string;
  statusCode: number;
};

export const logout: () => Promise<LogoutRes> = async () => {
  const api = createApiInstance();
  const response: AxiosResponse<LogoutRes> = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    { withCredentials: true }
  );
  return response.data;
};

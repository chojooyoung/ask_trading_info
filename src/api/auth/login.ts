import axios, { AxiosResponse } from "axios";
import { createApiInstance } from "@/api";
export type LoginData = {
  email: string;
  password: string;
};

export type LoginRes = {
  message: string[];
  error: string;
  statusCode: number;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
};

export const login: (userData: LoginData) => Promise<LoginRes> = async (
  userData: LoginData
) => {
  const api = createApiInstance();
  const response: AxiosResponse<LoginRes> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    userData,
    { withCredentials: true }
  );
  return response.data;
};

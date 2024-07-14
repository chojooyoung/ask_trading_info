import axios, { AxiosResponse } from "axios";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginRes = {
  message: string[];
  error: string;
  statusCode: number;
};

export const login: (userData: LoginData) => Promise<LoginRes> = async (
  userData: LoginData
) => {
  const response: AxiosResponse<LoginRes> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    userData,
    { withCredentials: true }
  );
  return response.data;
};

import axios, { AxiosResponse } from "axios";

export type SignUpData = {
  email: string;
  password: string;
};

export type SingnUPRes = {
  message: string;
  error: string;
  statusCode: number;
};

export interface ApiError extends Error {
  statusCode?: number;
  response?: {
    data: SingnUPRes;
  };
}

export const signUp: (userData: SignUpData) => Promise<SingnUPRes> = async (
  userData: SignUpData
) => {
  const response: AxiosResponse<SingnUPRes> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    userData
  );
  return response.data;
};

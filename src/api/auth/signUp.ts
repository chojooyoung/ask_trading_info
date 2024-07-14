import axios, { AxiosResponse } from "axios";

const API_URL = "https://ai-calorie-diary.onrender.com";

export type SignUpData = {
  email: string;
  password: string;
};

export type SingnUPRes = {
  message: string[];
  error: string;
  statusCode: number;
};

export const signUp: (userData: SignUpData) => Promise<SingnUPRes> = async (
  userData: SignUpData
) => {
  const response: AxiosResponse<SingnUPRes> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    userData
  );
  return response.data;
};

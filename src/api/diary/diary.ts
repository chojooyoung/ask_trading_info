import axios, { AxiosResponse } from "axios";
import { createApiInstance } from "@/api";

export type DiaryRes = {
  message: string[];
  error: string;
  statusCode: number;
};

export type DiaryData = {
  title: string;
  image: string;
};

export const logout: (diaryData: DiaryData) => Promise<DiaryRes> = async (
  diaryData: DiaryData
) => {
  const api = createApiInstance();
  const response: AxiosResponse<DiaryRes> = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/diary`,
    diaryData
  );
  return response.data;
};

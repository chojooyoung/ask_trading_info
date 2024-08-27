// lib/mockData.ts
import dayjs from "dayjs";

export interface DailyData {
  date: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export const generateMockData = (
  startDate: string,
  days: number
): DailyData[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = dayjs(startDate).add(i, "day");
    return {
      date: date.format("YYYY-MM-DD"),
      calories: Math.floor(Math.random() * (2500 - 1500) + 1500),
      carbs: Math.floor(Math.random() * (300 - 150) + 150),
      protein: Math.floor(Math.random() * (150 - 50) + 50),
      fat: Math.floor(Math.random() * (100 - 30) + 30),
    };
  });
};

export const mockData = generateMockData("2024-01-01", 365);

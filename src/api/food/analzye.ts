import axios, { AxiosResponse } from "axios";
import { createApiInstance } from "@/api";

export type Nutrient = {
  amount: number;
  unit: string;
  calories: number;
};

export type IngredientBreakdown = {
  [nutrient: string]: Nutrient;
};

export type AnalyzedRes = {
  ingredients: string[];
  totalCalories: number;
  breakdown: {
    [ingredient: string]: IngredientBreakdown;
  };
};

export type Meal = {
  name: string;
  analyzedData: AnalyzedRes;
  image?: string;
};

export type AnalzyFoodRes = {
  message: string[];
  error: string;
  statusCode: number;
};

export type FoodData = {
  image: string;
  description: string;
};

export const analyzeFood: (foodData: FoodData) => Promise<AnalyzedRes> = async (
  foodData: FoodData
) => {
  const api = createApiInstance();
  const response: AxiosResponse<AnalyzedRes> = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/food/analyze`,
    foodData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

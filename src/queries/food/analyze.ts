import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { analyzeFood, FoodData, AnalyzedRes } from "@/api/food/analzye";

export const useAnalzeFoodImage = (): UseMutationResult<
  AnalyzedRes,
  FoodData
> => {
  return useMutation({
    mutationFn: analyzeFood,
  });
};

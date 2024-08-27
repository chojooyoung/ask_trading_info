export const translateNutrient = (nutrient: string): string => {
  const translations: { [key: string]: string } = {
    protein: "단백질",
    fat: "지방",
    carbohydrate: "탄수화물",
  };
  return translations[nutrient] || nutrient;
};

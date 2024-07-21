export interface NutritionInfo {
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  sugar?: number;
  sodium?: number;
  // 추가적인 영양 성분들...
}

export interface Meal {
  name: string;
  image?: string;
  nutrition: NutritionInfo;
}

export interface DayData {
  date: string;
  meals: Meal[];
}

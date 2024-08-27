import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { compressImage } from "@/utils/compressImage";
import { useAnalzeFoodImage } from "@/queries/food/analyze";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export type Nutrient = {
  amount: number;
  unit: string;
  calories: number;
};

export type IngredientBreakdown = {
  [nutrient: string]: Nutrient;
};

export type AnalyzedMeal = {
  ingredients: string[];
  totalCalories: number;
  breakdown: {
    [ingredient: string]: IngredientBreakdown;
  };
};

export type Meal = {
  name: string;
  analyzedData: AnalyzedMeal;
  image?: string;
};

export const useMealForm = (
  mode: "create" | "edit",
  initialData?: { date: string; meal: Meal }
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const analyzeImageMutation = useAnalzeFoodImage();

  const { register, handleSubmit, setValue, watch, reset } = useForm<{
    date: string;
    meal: Meal;
  }>({
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      meal: {
        name: "",
        analyzedData: { ingredients: [], totalCalories: 0, breakdown: {} },
        image: "",
      },
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        date: dayjs(initialData.date).format("YYYY-MM-DD"),
        meal: initialData.meal,
      });
    }
  }, [mode, initialData, reset]);

  const meal = watch("meal");

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      let processedFile = file;
      if (file.size > 3 * 1024 * 1024) {
        console.log("dd");
        processedFile = await compressImage(file, 3);
      }

      const imageUrl = URL.createObjectURL(processedFile);

      const formData = new FormData();
      formData.append("description", meal.name);

      if (processedFile) {
        formData.append("image", processedFile);
      }

      const analyzedData = await analyzeImageMutation.mutateAsync(formData);
      setValue("meal", {
        ...meal,
        analyzedData,
        image: imageUrl,
      });
      setIsAccordionOpen(true);
    } catch (error) {
      console.error("이미지 처리 실패:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addIngredient = () => {
    const newIngredient = `재료 ${meal.analyzedData.ingredients.length + 1}`;
    setValue("meal", {
      ...meal,
      analyzedData: {
        ...meal.analyzedData,
        ingredients: [...meal.analyzedData.ingredients, newIngredient],
        breakdown: {
          ...meal.analyzedData.breakdown,
          [newIngredient]: {
            protein: { amount: 0, unit: "g", calories: 0 },
            fat: { amount: 0, unit: "g", calories: 0 },
            carbohydrate: { amount: 0, unit: "g", calories: 0 },
          },
        },
      },
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...meal.analyzedData.ingredients];
    const removedIngredient = newIngredients.splice(index, 1)[0];
    const newBreakdown = { ...meal.analyzedData.breakdown };
    delete newBreakdown[removedIngredient];

    setValue("meal", {
      ...meal,
      analyzedData: {
        ...meal.analyzedData,
        ingredients: newIngredients,
        breakdown: newBreakdown,
      },
    });
  };

  const calculateTotalCalories = () => {
    return Object.values(meal.analyzedData.breakdown).reduce(
      (total, ingredient) => {
        return (
          total +
          Object.values(ingredient).reduce(
            (subtotal, nutrient) => subtotal + nutrient.calories,
            0
          )
        );
      },
      0
    );
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    meal,
    isAnalyzing,
    isAccordionOpen,
    setIsAccordionOpen,
    handleImageUpload,
    addIngredient,
    removeIngredient,
    calculateTotalCalories,
  };
};

"use client";
import React, { useRef } from "react";
import {
  FaUtensils,
  FaCamera,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
} from "react-icons/fa";
import { useMealForm } from "./hook/useMealForm";
import { IngredientInput } from "./components/IngredientInput";

type FoodEntryFormProps = {
  mode: "create" | "edit";
  initialData?: {
    date: string;
    meal: {
      name: string;
      analyzedData: {
        ingredients: string[];
        totalCalories: number;
        breakdown: {
          [ingredient: string]: {
            [nutrient: string]: {
              amount: number;
              unit: string;
              calories: number;
            };
          };
        };
      };
      image?: string;
    };
  };
  onSubmit: (data: { date: string; meal: any }) => void;
};

export const FoodEntryForm: React.FC<FoodEntryFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    meal,
    isAnalyzing,
    isAccordionOpen,
    setIsAccordionOpen,
    handleImageUpload,
    addIngredient,
    removeIngredient,
    calculateTotalCalories,
  } = useMealForm(mode, initialData);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...meal.analyzedData.ingredients];
    const oldIngredient = newIngredients[index];
    newIngredients[index] = value;

    const newBreakdown = { ...meal.analyzedData.breakdown };
    if (oldIngredient !== value) {
      delete newBreakdown[oldIngredient];
      newBreakdown[value] = newBreakdown[value] || {
        protein: { amount: 0, unit: "g", calories: 0 },
        fat: { amount: 0, unit: "g", calories: 0 },
        carbohydrate: { amount: 0, unit: "g", calories: 0 },
      };
    }

    setValue("meal.analyzedData", {
      ...meal.analyzedData,
      ingredients: newIngredients,
      breakdown: newBreakdown,
    });
  };

  const handleCaloriesChange = (
    ingredient: string,
    nutrient: string,
    option: "amount" | "calories",
    value: number
  ) => {
    setValue(
      `meal.analyzedData.breakdown.${ingredient}.${nutrient}.${option}`,
      value
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const totalCalories = calculateTotalCalories();
        onSubmit({
          ...data,
          meal: {
            ...data.meal,
            analyzedData: { ...data.meal.analyzedData, totalCalories },
          },
        });
      })}
      className="max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        {mode === "create" ? "오늘의 맛있는 기록" : "맛있는 기록 수정하기"}
      </h2>

      <div className="mb-6">
        <label
          htmlFor="date"
          className="block mb-2 font-semibold text-indigo-600"
        >
          언제 드셨나요?
        </label>
        <input
          type="date"
          id="date"
          {...register("date")}
          className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="mealName"
          className="block mb-2 font-semibold text-indigo-600 flex items-center"
        >
          <FaUtensils className="mr-2" /> 어떤 음식인가요?
        </label>
        <input
          type="text"
          id="mealName"
          {...register("meal.name")}
          className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          required
          placeholder="예: 치킨 샐러드"
        />
      </div>

      <div className="mb-6 w-full">
        <label
          htmlFor="mealImage"
          className="block mb-2 font-semibold text-indigo-600 flex items-center"
        >
          <FaCamera className="mr-2" /> 음식 사진 추가하기 (선택사항)
        </label>
        <div className="flex items-center w-full">
          <input
            type="file"
            id="mealImage"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
            className="hidden"
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
          >
            <FaCamera className="mr-2" /> 사진 선택
          </button>
        </div>
        {meal.image && (
          <div className="mt-4 relative">
            <img
              src={meal.image}
              alt="음식 사진"
              className="mt-4 w-full h-[200px] object-contain rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      <div className="mt-4 border border-indigo-200 rounded-lg">
        <button
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full p-4 text-left font-semibold text-indigo-600 flex justify-between items-center"
        >
          영양 정보 {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isAccordionOpen && (
          <div className="p-4">
            <p className="mb-2 font-bold">
              총 칼로리: {calculateTotalCalories()} kcal
            </p>
            {meal.analyzedData.ingredients.map((ingredient, index) => (
              <IngredientInput
                key={index}
                ingredient={ingredient}
                index={index}
                breakdown={meal.analyzedData.breakdown[ingredient]}
                onIngredientChange={handleIngredientChange}
                onCaloriesChange={handleCaloriesChange}
                onRemove={removeIngredient}
              />
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
            >
              <FaPlus className="mr-2" /> 재료 추가
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 disabled:bg-gray-400 text-lg font-semibold"
        disabled={isAnalyzing}
      >
        {isAnalyzing
          ? "맛있는 음식을 분석 중..."
          : mode === "create"
          ? "맛있는 기록 저장하기"
          : "맛있는 기록 수정하기"}
      </button>
    </form>
  );
};

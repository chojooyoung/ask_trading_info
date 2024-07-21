import React, { useState, useEffect, useRef, useCallback } from "react";
import dayjs from "dayjs";

import {
  FaUtensils,
  FaFire,
  FaCamera,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const analyzeImage = async (
  file: File
): Promise<{ name: string; calories: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { name: "분석된 음식", calories: "300" };
};

type Meal = {
  name: string;
  calories: string;
  image?: string;
};

const FoodEntryForm = ({
  mode,
  initialData,
  onSubmit,
}: {
  mode: "create" | "edit";
  initialData?: {
    date: string;
    meals: { name: string; calories: string; image?: string }[];
  };
  onSubmit: (data: {
    date: string;
    meals: { name: string; calories: string; image?: string }[];
  }) => void;
}) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [meals, setMeals] = useState<Meal[]>([
    { name: "", calories: "", image: "" },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRefs = useRef(new Map<number, HTMLInputElement>());
  const setFileInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      if (el) {
        fileInputRefs.current.set(index, el);
      } else {
        fileInputRefs.current.delete(index);
      }
    },
    []
  );
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setDate(dayjs(initialData.date).format("YYYY-MM-DD"));
      setMeals(initialData.meals);
    }
  }, [mode, initialData]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleMealChange = (index: number, field: string, value: string) => {
    const updatedMeals = [...meals];
    updatedMeals[index] = { ...updatedMeals[index], [field]: value };
    setMeals(updatedMeals);
  };

  const addMeal = () => {
    setMeals([...meals, { name: "", calories: "", image: "" }]);
  };

  const removeMeal = (index: number) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, meals });
  };

  const handleImageUpload = async (index: number) => {
    const fileInput = fileInputRefs.current.get(index);
    const file = fileInput?.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      try {
        const result = await analyzeImage(file);
        const imageUrl = URL.createObjectURL(file);
        const updatedMeals = [...meals];
        updatedMeals[index] = { ...result, image: imageUrl };
        setMeals(updatedMeals);
      } catch (error) {
        console.error("이미지 분석 실패:", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedMeals = [...meals];
    updatedMeals[index] = { ...updatedMeals[index], image: "" };
    setMeals(updatedMeals);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          value={date}
          onChange={handleDateChange}
          className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          required
        />
      </div>

      {meals.map((meal, index) => (
        <div
          key={index}
          className="mb-8 p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor={`mealName${index}`}
              className="block mb-2 font-semibold text-indigo-600 flex items-center"
            >
              <FaUtensils className="mr-2" /> 어떤 음식인가요?
            </label>
            <input
              type="text"
              id={`mealName${index}`}
              value={meal.name}
              onChange={(e) => handleMealChange(index, "name", e.target.value)}
              className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
              placeholder="예: 맛있는 샐러드"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`mealCalories${index}`}
              className="block mb-2 font-semibold text-indigo-600 flex items-center"
            >
              <FaFire className="mr-2" /> 칼로리는 얼마인가요?
            </label>
            <input
              type="number"
              id={`mealCalories${index}`}
              value={meal.calories}
              onChange={(e) =>
                handleMealChange(index, "calories", e.target.value)
              }
              className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
              placeholder="예: 300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`mealImage${index}`}
              className="block mb-2 font-semibold text-indigo-600 flex items-center"
            >
              <FaCamera className="mr-2" /> 음식 사진 추가하기
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id={`mealImage${index}`}
                accept="image/*"
                onChange={() => handleImageUpload(index)}
                className="hidden"
                ref={setFileInputRef(index)}
              />
              <button
                type="button"
                onClick={() => fileInputRefs.current.get(index)?.click()}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 flex items-center"
              >
                <FaCamera className="mr-2" /> 사진 선택
              </button>
              <span className="ml-3 text-sm text-gray-600">
                {meal.image ? "멋진 사진이네요!" : "사진을 분석해드려요!"}
              </span>
            </div>
            {meal.image && (
              <div className="mt-4 relative">
                <img
                  src={meal.image}
                  alt="음식 사진"
                  className="mt-4 max-w-full h-auto rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeMeal(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
          >
            <FaTrash className="mr-2" /> 삭제
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addMeal}
        className="mb-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center mx-auto"
      >
        <FaPlus className="mr-2" /> 음식 추가하기
      </button>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 disabled:bg-gray-400 text-lg font-semibold"
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

export default FoodEntryForm;

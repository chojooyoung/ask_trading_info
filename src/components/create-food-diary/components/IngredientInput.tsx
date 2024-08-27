import React from "react";
import { FaTrash } from "react-icons/fa";

type IngredientInputProps = {
  ingredient: string;
  index: number;
  breakdown: {
    [nutrient: string]: {
      amount: number;
      unit: string;
      calories: number;
    };
  };
  onIngredientChange: (index: number, value: string) => void;
  onCaloriesChange: (
    ingredient: string,
    nutrient: string,
    option: "amount" | "calories",
    value: number
  ) => void;
  onRemove: (index: number) => void;
};

const translateNutrient = (nutrient: string): string => {
  const translations: { [key: string]: string } = {
    protein: "단백질",
    fat: "지방",
    carbohydrate: "탄수화물",
  };
  return translations[nutrient] || nutrient;
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  index,
  breakdown,
  onIngredientChange,
  onCaloriesChange,
  onRemove,
}) => {
  return (
    <div className="mb-4 sm:mb-6 p-3 sm:p-6 bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg text-sm sm:text-base">
      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">
        재료이름
      </label>
      <div className="flex flex-col sm:flex-row items-center mb-3 sm:mb-4">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => onIngredientChange(index, e.target.value)}
          className="w-full sm:w-2/3 p-2 sm:p-3 text-sm sm:text-base border border-indigo-300 rounded-lg mr-2 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="재료 이름"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="w-full sm:w-auto p-2 sm:p-3 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
        >
          <FaTrash className="mr-2" /> 삭제
        </button>
      </div>
      {Object.entries(breakdown || {}).map(([nutrient, data]) => (
        <div key={nutrient} className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">
            {translateNutrient(nutrient)}
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-1/2 flex items-center">
              <input
                type="number"
                value={data.amount}
                onChange={(e) =>
                  onCaloriesChange(
                    ingredient,
                    nutrient,
                    "amount",
                    Number(e.target.value)
                  )
                }
                className="w-full p-1 sm:p-2 text-sm sm:text-base border border-indigo-300 rounded-lg mr-1 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-gray-600 text-sm sm:text-base">g</span>
            </div>
            <div className="w-full sm:w-1/2 flex items-center">
              <input
                type="number"
                value={data.calories}
                onChange={(e) =>
                  onCaloriesChange(
                    ingredient,
                    nutrient,
                    "calories",
                    Number(e.target.value)
                  )
                }
                className="w-full p-1 sm:p-2 text-sm sm:text-base border border-indigo-300 rounded-lg mr-1 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-gray-600 text-sm sm:text-base">kcal</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

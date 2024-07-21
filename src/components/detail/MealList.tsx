// app/detail/[date]/MealList.tsx
"use client";
import Image from "next/image";
import { Meal } from "@/types/detail";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import MealDetailChart from "./MealDetailChart";

interface MealListProps {
  meals: Meal[];
}

export default function MealList({ meals }: MealListProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const handleOpenModal = (meal: Meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <>
      <div className="space-y-4">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            {meal.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <p className="text-gray-600">{meal.nutrition.calories} kcal</p>
            </div>
            <button
              onClick={() => handleOpenModal(meal)}
              className="text-blue-500 hover:text-blue-700"
            >
              상세보기
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={!!selectedMeal} onClose={handleCloseModal}>
        {selectedMeal && (
          <div>
            <h2 className="text-2xl text-center font-bold mb-4">
              {selectedMeal.name}
            </h2>
            {selectedMeal.image && (
              <div className="relative w-full h-60 mb-4">
                <Image
                  src={selectedMeal.image}
                  alt={selectedMeal.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <MealDetailChart meal={selectedMeal} />
          </div>
        )}
      </Modal>
    </>
  );
}

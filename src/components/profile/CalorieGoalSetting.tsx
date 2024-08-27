// components/CalorieGoalSetting.tsx
"use client";
import { useState } from "react";

export default function CalorieGoalSetting() {
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 목표 칼로리 저장 로직 추가
    console.log("Calorie goal set to:", calorieGoal);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="calorieGoal" className="block mb-2">
        목표 칼로리 설정:
      </label>
      <input
        type="number"
        id="calorieGoal"
        value={calorieGoal}
        onChange={(e) => setCalorieGoal(Number(e.target.value))}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        설정
      </button>
    </form>
  );
}

// app/page.tsx
import CalorieGoalSetting from "@/components/profile/CalorieGoalSetting";
import MonthlyCalorieGraph from "@/components/profile/MonthlyCalorieGraph";
import NutrientAverageGraph from "@/components/profile/NutrientAverageGraph";
import MonthSelector from "@/components/profile/MonthSelector";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Calorie Tracker</h1>
      <CalorieGoalSetting />
      <MonthSelector />
      <div className="grid grid-cols-1 gap-6 mt-6">
        <MonthlyCalorieGraph />
        <NutrientAverageGraph />
      </div>
    </div>
  );
}

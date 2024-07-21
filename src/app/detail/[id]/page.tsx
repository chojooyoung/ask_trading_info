import Image from "next/image";
import { fetchDataFromAPI } from "@/api/detail/detail";
import EditButton from "@/components/detail/EditButton";
import NutritionChart from "@/components/detail/NutritionChart";
import MealList from "@/components/detail/MealList";
import { DayData } from "@/types/detail";

async function DetailPage({ params }: { params: { date: string } }) {
  const data: DayData = await fetchDataFromAPI(params.date);
  const totalCalories = data.meals.reduce(
    (sum, meal) => sum + meal.nutrition.calories,
    0
  );
  const calorieGoal = 2000; // 이 값은 사용자 설정에 따라 동적으로 가져올 수 있습니다.

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* 헤더 섹션 */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">
              {new Date(data.date).toLocaleDateString("ko-KR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-xl">섭취 칼로리: {totalCalories} kcal</p>
                <p className="text-sm opacity-75">목표: {calorieGoal} kcal</p>
              </div>
              <div className="text-right">
                <p className="text-xl">
                  {totalCalories > calorieGoal ? "초과" : "남은"} 칼로리
                </p>
                <p className="text-2xl font-bold">
                  {Math.abs(calorieGoal - totalCalories)} kcal
                </p>
              </div>
            </div>
          </div>

          {/* 영양 차트 섹션 */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">영양 섭취 현황</h2>
            <NutritionChart meals={data.meals} />
          </div>

          {/* 식사 목록 섹션 */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">오늘의 식사</h2>
            <MealList meals={data.meals} />
          </div>

          {/* 액션 버튼 섹션 */}
          <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
            <EditButton date={data.date} />
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300">
              식사 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;

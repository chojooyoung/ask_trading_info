// app/detail/[date]/MealDetailChart.tsx
"use client";
import { useEffect, useState } from "react";
import { Meal, NutritionInfo } from "@/types/detail";

interface MealDetailChartProps {
  meal: Meal;
}

export default function MealDetailChart({ meal }: MealDetailChartProps) {
  const [ChartComponent, setChartComponent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      import("react-chartjs-2"),
      import("chart.js"),
      import("chart.js/auto"),
    ]).then(([chartjs2, ChartJS, ChartAuto]) => {
      setChartComponent(() => chartjs2.Bar);
      ChartJS.Chart.register(
        ChartJS.CategoryScale,
        ChartJS.LinearScale,
        ChartJS.BarElement,
        ChartJS.Title,
        ChartJS.Tooltip,
        ChartJS.Legend
      );
    });
  }, []);

  const nutritionLabels = Object.keys(
    meal.nutrition
  ) as (keyof NutritionInfo)[];

  const data = {
    labels: nutritionLabels.map(
      (label) => label.charAt(0).toUpperCase() + label.slice(1)
    ),
    datasets: [
      {
        label: "영양 성분",
        data: nutritionLabels.map((label) => meal.nutrition[label]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "영양 성분 분석",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "그램 (g)",
        },
      },
    },
  };

  if (!ChartComponent) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="w-full h-64">
      <ChartComponent data={data} options={options} />
    </div>
  );
}

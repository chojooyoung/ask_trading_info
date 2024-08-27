// components/NutrientAverageGraph.tsx
"use client";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { mockData } from "@/mock/mockData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NutrientAverageGraph() {
  const [averageNutrients, setAverageNutrients] = useState({
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  useEffect(() => {
    // 현재 월의 평균 영양소 계산
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const filteredData = mockData.filter((item) => {
      const [year, month] = item.date.split("-").map(Number);
      return year === currentYear && month === currentMonth;
    });

    const totalNutrients = filteredData.reduce(
      (acc, curr) => ({
        carbs: acc.carbs + curr.carbs,
        protein: acc.protein + curr.protein,
        fat: acc.fat + curr.fat,
      }),
      { carbs: 0, protein: 0, fat: 0 }
    );

    const average = {
      carbs: totalNutrients.carbs / filteredData.length,
      protein: totalNutrients.protein / filteredData.length,
      fat: totalNutrients.fat / filteredData.length,
    };

    setAverageNutrients(average);
  }, []);

  const data = {
    labels: ["탄수화물", "단백질", "지방"],
    datalabels: {
      display: true,
    },
    datasets: [
      {
        data: [
          averageNutrients.carbs,
          averageNutrients.protein,
          averageNutrients.fat,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "평균 영양소 섭취 비율",
        font: {
          size: 16,
        },
      },
      legend: {
        position: "bottom" as const,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
        },
        formatter: (value: number, ctx: any) => {
          const dataset = ctx.chart.data.datasets[0];
          const total = dataset.data.reduce(
            (acc: number, data: number) => acc + data,
            0
          );
          const percentage = Math.round((value / total) * 100);
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

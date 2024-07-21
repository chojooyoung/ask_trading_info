// app/detail/[date]/NutritionChart.tsx
"use client";
import { useEffect, useState } from "react";
import { Meal, NutritionInfo } from "@/types/detail";

interface NutritionChartProps {
  meals: Meal[];
}

export default function NutritionChart({ meals }: NutritionChartProps) {
  const [ChartComponent, setChartComponent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      import("react-chartjs-2"),
      import("chart.js"),
      import("chart.js/auto"),
    ]).then(([chartjs2, ChartJS, ChartAuto]) => {
      setChartComponent(() => chartjs2.Doughnut);
      ChartJS.Chart.register(
        ChartJS.ArcElement,
        ChartJS.Tooltip,
        ChartJS.Legend
      );
    });
  }, []);

  const nutritionData = meals.reduce((acc, meal) => {
    Object.entries(meal.nutrition).forEach(([key, value]) => {
      if (key !== "calories") {
        // 칼로리는 제외
        acc[key] = (acc[key] || 0) + value;
      }
    });
    return acc;
  }, {} as NutritionInfo);

  const totalNutrition = Object.values(nutritionData).reduce(
    (sum, value) => sum + value,
    0
  );

  const nutritionLabels = Object.keys(nutritionData);
  const nutritionValues = Object.values(nutritionData);

  const data = {
    labels: nutritionLabels.map(
      (label) => label.charAt(0).toUpperCase() + label.slice(1)
    ),
    datasets: [
      {
        data: nutritionValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage = ((value / totalNutrition) * 100).toFixed(1);
            return `${label}: ${value}g (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number) => {
          return `${value}g`;
        },
      },
    },
  };

  const plugins = [
    {
      id: "datalabels",
      afterDatasetsDraw(chart: any) {
        const { ctx, data } = chart;
        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          if (!meta.hidden) {
            meta.data.forEach((element: any, index: number) => {
              const { x, y } = element.tooltipPosition();
              ctx.fillStyle = "white";
              ctx.font = "14px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(`${data.datasets[datasetIndex].data[index]}g`, x, y);
            });
          }
        });
      },
    },
  ];

  if (!ChartComponent) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="w-full h-[200px] md:h-80 lg:h-96 relative">
      <ChartComponent data={data} options={options} plugins={plugins} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg44 md:text-2xl font-bold">
            {totalNutrition}g
          </div>
          <div className="text-[12px] md:text-sm text-gray-500">총 영양소</div>
        </div>
      </div>
    </div>
  );
}

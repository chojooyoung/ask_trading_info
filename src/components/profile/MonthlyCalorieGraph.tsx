// components/MonthlyCalorieGraph.tsx
"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { mockData, DailyData } from "@/mock/mockData";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyCalorieGraph() {
  const [monthlyData, setMonthlyData] = useState<DailyData[]>([]);
  const calorieGoal = 2000;

  useEffect(() => {
    const currentMonth = dayjs().format("YYYY-MM");
    const filteredData = mockData.filter(
      (item) => dayjs(item.date).format("YYYY-MM") === currentMonth
    );
    setMonthlyData(filteredData);
  }, []);

  const data = {
    labels: monthlyData.map((item) => dayjs(item.date).format("DD")),
    datalabels: {
      display: false,
    },
    datasets: [
      {
        label: "일일 섭취 칼로리",
        data: monthlyData.map((item) => item.calories),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "목표 칼로리",
        data: Array(monthlyData.length).fill(calorieGoal),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "이번 달 칼로리 섭취",
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

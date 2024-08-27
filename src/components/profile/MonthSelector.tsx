// components/MonthSelector.tsx
"use client";
import { useState } from "react";

export default function MonthSelector() {
  const [selectedMonth, setSelectedMonth] = useState<string>("2024-08");

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
    // 여기에서 선택된 월에 따라 데이터를 업데이트하는 로직을 추가할 수 있습니다.
    console.log("Selected month:", e.target.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="monthSelect" className="block mb-2">
        월 선택:
      </label>
      <input
        type="month"
        id="monthSelect"
        value={selectedMonth}
        onChange={handleMonthChange}
        className="border p-2"
      />
    </div>
  );
}

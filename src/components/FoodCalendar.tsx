"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMediaQuery } from "react-responsive";

dayjs.locale("ko");
const localizer = dayjsLocalizer(dayjs);

interface FoodEntry {
  id: string;
  date: string;
  meals: { name: string; calories: number }[];
}

interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
}

const RECOMMENDED_DAILY_CALORIES = 2000; // 예시 값, 실제 권장량에 맞게 조정하세요

const generateMockData = (year: number, month: number): FoodEntry[] => {
  const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
  const mockData: FoodEntry[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = dayjs(`${year}-${month + 1}-${day}`);
    if (Math.random() > 0.3) {
      mockData.push({
        id: date.format("YYYY-MM-DD"),
        date: date.format("YYYY-MM-DD"),
        meals: [
          { name: "아침", calories: Math.floor(Math.random() * 500) + 200 },
          { name: "점심", calories: Math.floor(Math.random() * 800) + 400 },
          { name: "저녁", calories: Math.floor(Math.random() * 700) + 300 },
        ],
      });
    }
  }

  return mockData;
};

const CalendarComponent = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const isMobile = useMediaQuery({ maxWidth: 700 });

  const getColorByCalories = (calories: number): string => {
    const percentage = calories / RECOMMENDED_DAILY_CALORIES;
    if (percentage <= 0.5) return "rgba(34, 197, 94, 0.9)"; // green-500
    if (percentage <= 0.75) return "rgba(234, 179, 8, 0.9)"; // yellow-500
    if (percentage <= 1) return "rgba(249, 115, 22, 0.9)"; // orange-500
    return "rgba(239, 68, 68, 0.9)"; // red-500
  };

  const eventPropGetter = useCallback((event: CalendarEvent) => {
    const calories = parseInt(event.title.split(" ")[0]);
    const backgroundColor = getColorByCalories(calories);

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "0.25rem",
        padding: isMobile ? "0.0625rem 0.125rem" : "0.125rem 0.25rem",
        fontSize: isMobile ? "0.625rem" : "16px",
        fontWeight: "600",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        border: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        height: "auto",
        minHeight: isMobile ? "1.25rem" : "1.5rem",
        lineHeight: isMobile ? "1.25rem" : "1.5rem",
      },
    };
  }, []);

  const fetchMonthData = useCallback((year: number, month: number) => {
    const mockData = generateMockData(year, month);
    const calendarEvents = mockData.map((entry) => ({
      start: dayjs(entry.date).toDate(),
      end: dayjs(entry.date).toDate(),
      title: `${entry.meals.reduce(
        (sum, meal) => sum + meal.calories,
        0
      )} kcal`,
    }));
    setEvents(calendarEvents);
  }, []);

  useEffect(() => {
    fetchMonthData(currentDate.year(), currentDate.month());
  }, [currentDate, fetchMonthData]);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(dayjs(newDate));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    setCurrentDate(currentDate.year(year));
  };

  const yearOptions = [];
  const currentYear = dayjs().year();
  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}년
      </option>
    );
  }

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToCurrent = () => {
      toolbar.onNavigate("TODAY");
    };

    return (
      <div className="flex items-center justify-between mb-4 sm:p-0 px-3">
        <div className="flex items-center sm:space-x-4">
          <button
            onClick={goToBack}
            className="sm:p-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <FaChevronLeft className="sm:h-5 sm:w-5 text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="sm:p-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <FaChevronRight className="sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>
        <h2 className="sm:text-2xl font-bold text-gray-800">
          {dayjs(toolbar.date).format("YYYY년 M월")}
        </h2>
        <button
          onClick={goToCurrent}
          className="sm:px-4 sm:py-2 px-1 sm:text-4 text-[14px]  bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
        >
          <FaCalendarAlt className="sm:mr-2 sm:w-4 sm:h-4 mr-1 w-2 h-2" />
          오늘
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="sm:p-6 pt-3">
          <div className="flex justify-between items-center sm:mb-6 mb-3 sm:p-0 px-3">
            <h1 className="sm:text-3xl font-bold text-gray-800 text-[20px]">
              음식 다이어리
            </h1>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="sm:p-2 p-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {yearOptions}
            </select>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 12rem)" }}
            onNavigate={handleNavigate}
            date={currentDate.toDate()}
            views={["month"]}
            messages={{
              next: "다음",
              previous: "이전",
              today: "오늘",
              month: "월",
            }}
            components={{
              toolbar: CustomToolbar,
            }}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;

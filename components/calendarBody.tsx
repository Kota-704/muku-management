"use client";

import { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function CalendarBody() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = currentDate.daysInMonth();
  const offset = currentDate.startOf("month").weekday();
  const monthLabel = currentDate.format("M月");
  const yearLabel = currentDate.format("YYYY年");

  const prevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };
  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-body">
      <p className="year text-center mt-6">{yearLabel}</p>
      <div className="flex justify-between">
        <button onClick={prevMonth} className="button">
          ← 前の月
        </button>
        <h2 className="calendar-month text-center my-4">{monthLabel}</h2>
        <button onClick={nextMonth} className="button">
          次の月 →
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="calendar-day grid grid-cols-7 text-xs">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <h3 key={d} className="text-center">
            {d}
          </h3>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="calendar-day grid grid-cols-7 text-xs">
        {/* 空白のセル：月初のオフセット分 */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="text-center h-20"></div>
        ))}
        {/* 各日付のセル */}
        {days.map((day) => (
          <div key={day} className="text-center h-20 flex pt-1 justify-center">
            <span>{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

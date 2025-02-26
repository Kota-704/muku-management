/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useDrag } from "@use-gesture/react";
import Link from "next/link";
import Image from "next/image";
import { getData } from "@/components/hooks/useFirestore";

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function CalendarBody() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [dayData, setDayData] = useState<Record<string, any>>({});
  const daysInMonth = currentDate.daysInMonth();
  const offset = currentDate.startOf("month").weekday();
  const monthLabel = currentDate.format("M月");
  const yearLabel = currentDate.format("YYYY年");
  const today = useMemo(() => dayjs(), []);
  const todayMonth = dayjs().month();
  const lastSwipeTime = useRef(0);

  const prevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };
  const nextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  // スワイプハンドラー
  const bind = useDrag(({ movement: [mx], direction: [dx], down, cancel }) => {
    if (down) return;

    // 複数スワイプ防止
    const now = Date.now();
    if (now - lastSwipeTime.current < 500) {
      cancel();
      return;
    }
    lastSwipeTime.current = now;

    const swipeThreshold = 50;
    if (Math.abs(mx) < swipeThreshold) {
      cancel();
      return;
    }

    if (dx > 0) prevMonth();
    if (dx < 0) nextMonth();
    cancel();
  });

  useEffect(() => {
    async function fetchMonthData() {
      const newData: Record<string, any> = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${currentDate.format("YYYY")}-${currentDate.format(
          "MM"
        )}-${String(day).padStart(2, "0")}`;
        const data = await getData(dateKey);
        if (data) {
          newData[dateKey] = data;
        }
      }
      setDayData(newData);
    }
    fetchMonthData();
  }, [currentDate]);

  return (
    <div {...bind()} className="calendar-body" style={{ touchAction: "none" }}>
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
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateKey = `${currentDate.format("YYYY")}-${currentDate.format(
            "MM"
          )}-${String(day).padStart(2, "0")}`;

          const data = dayData[dateKey];
          const isToday =
            day === today.date() && currentDate.month() === todayMonth;

          return (
            <div key={day} className="text-center h-20">
              <Link
                href={`/day/${currentDate.format("YYYY")}/${currentDate.format(
                  "MM"
                )}/${day}`}
              >
                <span
                  className={`block w-5 h-5 mx-auto ${
                    isToday ? "rounded-full bg-red-500" : ""
                  }`}
                >
                  {day}
                </span>
                <div className="">
                  {data &&
                    data.stroll &&
                    data.breakfast &&
                    data.dinner &&
                    data.supplement && (
                      <Image
                        src="/checked.png"
                        width={20}
                        height={20}
                        alt="Check"
                        className="mx-auto mt-1"
                      />
                    )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

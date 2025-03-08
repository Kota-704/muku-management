"use client";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import Link from "next/link";
import Image from "next/image";
import useGetDate from "./hooks/useGetDate";
import { DayData } from "./hooks/useGetDate";
import { useEffect, useState } from "react";

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function CalendarBody() {
  const {
    dayData,
    currentDate,
    daysInMonth,
    offset,
    monthLabel,
    yearLabel,
    today,
    todayMonth,
    prevMonth,
    nextMonth,
    bind,
  } = useGetDate();

  const [color, setColor] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const computedColor = getComputedStyle(root)
      .getPropertyValue("--foreground")
      .trim();
    setColor(computedColor);
  }, []);

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
          )}-${day}`;

          const data: DayData = dayData[dateKey] || {};
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
                <div className="checkmark">
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
                <div className="checkmark">
                  {data && data.memo && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 50 50"
                      style={{ color }}
                      className="block mx-auto mt-2"
                    >
                      <path
                        d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"
                        fill="currentColor"
                      ></path>
                    </svg>
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

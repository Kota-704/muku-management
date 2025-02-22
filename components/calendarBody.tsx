import { useState, useRef } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useDrag } from "@use-gesture/react";

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function CalendarBody() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = currentDate.daysInMonth();
  const offset = currentDate.startOf("month").weekday();
  const monthLabel = currentDate.format("M月");
  const yearLabel = currentDate.format("YYYY年");
  const today = dayjs().date();
  const todayMonth = dayjs().month();
  const lastSwipeTime = useRef(0); // スワイプの連続実行を防ぐ

  const prevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };
  const nextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  // スワイプハンドラー
  const bind = useDrag(({ movement: [mx], direction: [dx], down, cancel }) => {
    if (down) return; // スワイプ中は何もしない

    const now = Date.now();
    if (now - lastSwipeTime.current < 500) {
      cancel(); // 連続スワイプ防止（500ms以内の連続入力を無視）
      return;
    }
    lastSwipeTime.current = now;

    const swipeThreshold = 50; // スワイプのしきい値を設定（50px以上）
    if (Math.abs(mx) < swipeThreshold) {
      cancel(); // 小さな動きはキャンセル
      return;
    }

    if (dx > 0) prevMonth(); // 右スワイプ → 前の月へ
    if (dx < 0) nextMonth(); // 左スワイプ → 次の月へ
    cancel(); // 処理完了後にイベントをキャンセル
  });

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
          const isToday = day === today && currentDate.month() === todayMonth;

          return (
            <div key={day} className="text-center h-20">
              <span
                className={`block w-5 h-5 mx-auto ${
                  isToday ? "rounded-full bg-red-500 text-white" : "text-white"
                }`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useDrag } from "@use-gesture/react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useMemo, useRef, useState } from "react";
import { getData } from "./useFirestore";

dayjs.extend(weekday);

export interface DayData {
  stroll?: boolean;
  breakfast?: boolean;
  dinner?: boolean;
  supplement?: boolean;
  memo?: string;
}
export default function useGetDate() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [dayData, setDayData] = useState<Record<string, unknown>>({});
  const daysInMonth = currentDate.daysInMonth();
  const offset = currentDate.startOf("month").weekday();
  const monthLabel = currentDate.format("M月");
  const yearLabel = currentDate.format("YYYY年");
  const today = useMemo(() => dayjs(), []);
  const todayMonth = dayjs().month();
  const lastSwipeTimeDate = useRef(0);
  const lastSwipeTimeMonth = useRef(0);

  const prevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };
  const nextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };
  const prevDate = () => {
    setCurrentDate((current) => current.subtract(1, "day"));
  };
  const nextDate = () => {
    setCurrentDate((current) => current.add(1, "day"));
  };

  const moveDate = useDrag(
    ({ movement: [mx], direction: [dx], down, cancel }) => {
      if (down) return;

      // 複数スワイプ防止
      const now = Date.now();
      if (now - lastSwipeTimeDate.current < 500) {
        cancel();
        return;
      }
      lastSwipeTimeDate.current = now;

      const swipeThreshold = 50;
      if (Math.abs(mx) < swipeThreshold) {
        cancel();
        return;
      }

      if (dx > 0) prevDate();
      if (dx < 0) nextDate();
      cancel();
    }
  );

  // スワイプハンドラー
  const bind = useDrag(({ movement: [mx], direction: [dx], down, cancel }) => {
    if (down) return;

    // 複数スワイプ防止
    const now = Date.now();
    if (now - lastSwipeTimeMonth.current < 500) {
      cancel();
      return;
    }
    lastSwipeTimeMonth.current = now;

    const swipeThreshold = 50;
    if (Math.abs(mx) < swipeThreshold) {
      cancel();
      return;
    }

    if (dx > 0) prevMonth();
    if (dx < 0) nextMonth();
    cancel();
  });

  // 日付を跨いだら `currentDate` を更新する
  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      if (!currentDate.isSame(now, "day")) {
        setCurrentDate(now);
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [currentDate]);

  // Firestore のデータ取得
  useEffect(() => {
    async function fetchMonthData() {
      const newData: Record<string, unknown> = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${currentDate.format("YYYY")}-${currentDate.format(
          "MM"
        )}-${day}`;
        const data = await getData(dateKey);
        if (data) {
          newData[dateKey] = data;
        }
      }
      setDayData(newData);
    }
    fetchMonthData();
  }, [currentDate, daysInMonth]);

  return {
    dayData,
    setDayData,
    currentDate,
    setCurrentDate,
    daysInMonth,
    offset,
    monthLabel,
    yearLabel,
    today,
    todayMonth,
    prevMonth,
    nextMonth,
    bind,
    moveDate,
    lastSwipeTimeDate,
    lastSwipeTimeMonth,
  };
}

"use client";

import Link from "next/link";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useDailyRecord from "@/components/hooks/useDailyRecord";
import SwitchInput from "@/components/common/SwitchInput";
import dayjs from "dayjs";
import { useMemo } from "react";
import useGetDate from "@/components/hooks/useGetDate";
import { useRouter } from "next/navigation";

export default function DayDetailPage() {
  const {
    handleSave,
    handleUpdate,
    handleDelete,
    memo,
    setMemo,
    stroll,
    setStroll,
    breakfast,
    setBreakfast,
    dinner,
    setDinner,
    supplement,
    setSupplement,
    hasData,
  } = useDailyRecord();

  const router = useRouter();

  const { moveDate } = useGetDate();

  const params = useParams();

  const currentDate = dayjs(`${params.year}-${params.month}-${params.date}`);
  const prevDate = useMemo(() => currentDate.subtract(1, "day"), [currentDate]);
  const nextDate = useMemo(() => currentDate.add(1, "day"), [currentDate]);

  const goToPrevDate = () => {
    router.push(
      `/day/${prevDate.format("YYYY")}/${prevDate.format(
        "MM"
      )}/${prevDate.format("D")}`
    );
  };
  const goToNextDate = () => {
    router.push(
      `/day/${nextDate.format("YYYY")}/${nextDate.format(
        "MM"
      )}/${nextDate.format("D")}`
    );
  };

  return (
    <div {...moveDate} className="date-detail" style={{ touchAction: "none" }}>
      <div className="flex justify-between mt-5">
        {/* 🔽 前の日付に遷移 */}
        <button onClick={goToPrevDate}>← {prevDate.format("M月D日")}</button>

        {/* 🔽 次の日付に遷移 */}
        <button onClick={goToNextDate}>{nextDate.format("M月D日")} →</button>
      </div>
      <Link href="/" className="text-right block mt-5">
        戻る
      </Link>
      <p className="text-center text-xl">
        {params.year}年{params.month}月{params.date}日
      </p>
      <SwitchInput
        label="散歩"
        checked={stroll ?? false}
        onCheckedChange={(e) => setStroll(e.checked)}
      />
      <SwitchInput
        label="朝食"
        checked={breakfast ?? false}
        onCheckedChange={(e) => setBreakfast(e.checked)}
      />
      <SwitchInput
        label="夕食"
        checked={dinner ?? false}
        onCheckedChange={(e) => setDinner(e.checked)}
      />
      <SwitchInput
        label="サプリメント"
        checked={supplement ?? false}
        onCheckedChange={(e) => setSupplement(e.checked)}
      />
      <div className="text-center mt-5">
        <p className="mb-1">メモ</p>
        <Textarea
          autoresize
          className="max-w-xs mx-auto"
          placeholder="メッセージを入力してください"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <div className="text-center mt-20 flex justify-end gap-2">
        {hasData ? (
          <Button
            colorScheme="blue"
            variant="subtle"
            onClick={() => {
              handleUpdate();
            }}
          >
            更新
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            variant="subtle"
            color="primary"
            onClick={handleSave}
          >
            保存
          </Button>
        )}
        {hasData && (
          <Button
            colorScheme="blue"
            variant="subtle"
            color="primary"
            onClick={handleDelete}
          >
            削除
          </Button>
        )}
      </div>
    </div>
  );
}

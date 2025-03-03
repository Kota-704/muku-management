"use client";

import Link from "next/link";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useDailyRecord from "@/components/hooks/useDailyRecord";
import SwitchInput from "@/components/common/SwitchInput";

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

  const params = useParams();

  return (
    <div>
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

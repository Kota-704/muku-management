"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  saveData,
  getData,
  updateData,
  deleteData,
} from "@/components//hooks/useFirestore";
import { useParams } from "next/navigation";
import { Switch } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function DayDetailPage() {
  const ref = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState("");
  const [stroll, setStroll] = useState<boolean | null>(null);
  const [breakfast, setBreakfast] = useState<boolean | null>(null);
  const [dinner, setDinner] = useState<boolean | null>(null);
  const [supplement, setSupplement] = useState<boolean | null>(null);
  const params = useParams();
  const [hasData, setHasData] = useState(false);

  const date = `${params.year}-${params.month}-${params.date}`;

  useEffect(() => {
    async function fetchData() {
      const data = await getData(date);
      if (data) {
        setHasData(true);
        setStroll(data.stroll ?? false);
        setBreakfast(data.breakfast ?? false);
        setDinner(data.dinner ?? false);
        setSupplement(data.supplement ?? false);
        setMemo(data.memo || "");
      } else {
        setHasData(false);
      }
    }
    fetchData();
  }, [date]);

  const handleSave = async () => {
    const supplementValue = ref.current ? ref.current.checked : false;
    const date = `${params.year}-${params.month}-${params.date}`;
    await saveData(
      date,
      stroll ?? false,
      breakfast ?? false,
      dinner ?? false,
      supplementValue,
      memo
    );
  };

  const handleUpdate = async () => {
    const updatedFields = {
      stroll: stroll ?? undefined,
      breakfast: breakfast ?? undefined,
      dinner: dinner ?? undefined,
      supplement: supplement ?? undefined,
      memo,
    };
    await updateData(date, updatedFields);
    alert("データを更新しました");
  };

  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      await deleteData(date);
      alert("データを削除しました");
      setHasData(false);
      setStroll(false);
      setBreakfast(false);
      setDinner(false);
      setSupplement(false);
      setMemo("");
    }
  };

  return (
    <div>
      <Link href="/" className="text-right block mt-5">
        戻る
      </Link>
      <p className="text-center text-xl">
        {params.year}年{params.month}月{params.date}日
      </p>
      <div className="text-center mt-5">
        <p className="mb-1">散歩</p>
        <Switch.Root
          suppressHydrationWarning
          checked={stroll ?? false}
          colorPalette="blue"
          onCheckedChange={(e) => setStroll(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">朝食</p>
        <Switch.Root
          suppressHydrationWarning
          checked={breakfast ?? false}
          colorPalette="blue"
          onCheckedChange={(e) => setBreakfast(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">夕食</p>
        <Switch.Root
          suppressHydrationWarning
          checked={dinner ?? false}
          colorPalette="blue"
          onCheckedChange={(e) => setDinner(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </div>
      <div className="text-center mt-5 ">
        <p className="mb-1">サプリメント</p>
        <Switch.Root
          suppressHydrationWarning
          checked={supplement ?? false}
          colorPalette="blue"
          onCheckedChange={(e) => setSupplement(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </div>
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
            colorPalette="blue"
            variant="subtle"
            onClick={() => {
              handleUpdate();
            }}
          >
            更新
          </Button>
        ) : (
          <Button
            colorPalette="blue"
            variant="subtle"
            color="primary"
            onClick={handleSave}
          >
            保存
          </Button>
        )}
        {hasData && (
          <Button
            colorPalette="blue"
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

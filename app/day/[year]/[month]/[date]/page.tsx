"use client";

import Link from "next/link";
import { Switch } from "@heroui/switch";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import {
  saveData,
  getData,
  updateData,
  deleteData,
} from "@/components//hooks/useFirestore";
import { useParams } from "next/navigation";

export default function DayDetailPage() {
  const ref = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState("");
  const [stroll, setStroll] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [supplement, setSupplement] = useState(false);
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
    await saveData(date, stroll, breakfast, dinner, supplementValue, memo);
  };

  const handleUpdate = async () => {
    const updatedFields = { stroll, breakfast, dinner, supplement, memo };
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
        <Switch
          aria-label="散歩の状態"
          checked={stroll}
          onChange={(e) => setStroll(e.checked)}
        />
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">朝食</p>
        <Switch
          aria-label="朝食の状態"
          checked={breakfast}
          onChange={(e) => setBreakfast(e.checked)}
        />
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">夕食</p>
        <Switch
          aria-label="夕食の状態"
          checked={dinner}
          onChange={(e) => setDinner(e.checked)}
        />
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">サプリメント</p>
        <Switch
          aria-label="サプリメントの状態"
          onChange={(e) => setSupplement(e.checked)}
          checked={supplement}
          ref={ref}
        />
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">メモ</p>
        <Textarea
          variant="faded"
          className="max-w-xs mx-auto"
          placeholder="メッセージを入力してください"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <div className="text-center mt-20 flex justify-end gap-2">
        {hasData ? (
          <Button color="success" onPress={handleUpdate}>
            更新
          </Button>
        ) : (
          <Button color="primary" onPress={handleSave}>
            保存
          </Button>
        )}
        {hasData && (
          <Button color="danger" onPress={handleDelete}>
            削除
          </Button>
        )}
      </div>
    </div>
  );
}

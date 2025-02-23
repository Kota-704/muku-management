"use client";

import Link from "next/link";
import { Switch } from "@heroui/switch";
import { use, useRef, useState } from "react";
import { Textarea } from "@heroui/input";
import { saveData } from "@/components/hooks/useFirestore";

export default function DayDetailPage({
  params,
}: {
  params: Promise<{ year: string; month: string; date: string }>;
}) {
  const resolvedParams = use(params);
  const ref = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    const supplementValue = ref.current ? ref.current.checked : false;
    const date = `${resolvedParams.year}-${resolvedParams.month}-${resolvedParams.date}`;
    await saveData(date, supplementValue, message);
  };

  function handleRef(): boolean {
    const supplementValue = ref.current ? ref.current.checked : false;
    return supplementValue;
  }

  return (
    <div>
      <Link href="/">戻る</Link>
      <p className="text-center text-xl">
        {resolvedParams.year}年{resolvedParams.month}月{resolvedParams.date}日
      </p>
      <div className="text-center mt-5">
        <p className="mb-1">サプリメント</p>
        <Switch
          aria-label="サプリメントの状態"
          onChange={handleRef}
          ref={ref}
        />
      </div>
      <div className="text-center mt-5">
        <p className="mb-1">メッセージ</p>
        <Textarea
          className="max-w-xs mx-auto"
          placeholder="メッセージを入力してください"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="text-center mt-5">
        <button onClick={handleSave}>保存</button>
      </div>
    </div>
  );
}

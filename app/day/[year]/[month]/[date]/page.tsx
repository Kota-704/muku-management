"use client";

import Link from "next/link";
import { Switch } from "@heroui/switch";
import { use, useRef } from "react";

export default function DayDetailPage({
  params,
}: {
  params: Promise<{ year: string; month: string; date: string }>;
}) {
  const resolvedParams = use(params);
  const ref = useRef<HTMLInputElement>(null);

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
    </div>
  );
}

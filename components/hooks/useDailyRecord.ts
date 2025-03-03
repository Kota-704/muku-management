import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  saveData,
  getData,
  updateData,
  deleteData,
} from "@/components//hooks/useFirestore";

export default function useDailyRecord() {
  const [memo, setMemo] = useState("");
  const [stroll, setStroll] = useState<boolean | null>(null);
  const [breakfast, setBreakfast] = useState<boolean | null>(null);
  const [dinner, setDinner] = useState<boolean | null>(null);
  const [supplement, setSupplement] = useState<boolean | null>(null);
  const [hasData, setHasData] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const params = useParams();
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

  useEffect(() => {
    setIsAllChecked(stroll && breakfast && dinner && supplement ? true : false);
  }, [stroll, breakfast, dinner, supplement]);

  const handleSave = async () => {
    const date = `${params.year}-${params.month}-${params.date}`;
    await saveData(
      date,
      stroll ?? false,
      breakfast ?? false,
      dinner ?? false,
      supplement ?? false,
      memo
    );
    alert("データを保存しました");

    if (isAllChecked) {
      setShowDialog(true);
    }
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

    if (isAllChecked) {
      setShowDialog(true);
    }
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
  return {
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
    handleSave,
    handleUpdate,
    handleDelete,
    showDialog,
  };
}

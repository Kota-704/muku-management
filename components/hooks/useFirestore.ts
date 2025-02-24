import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { getApps, getApp } from "firebase/app";

export async function saveData(
  date: string,
  stroll: boolean,
  breakfast: boolean,
  dinner: boolean,
  supplement: boolean,
  memo?: string
) {
  try {
    await setDoc(doc(collection(db, "userData"), date), {
      stroll,
      breakfast,
      dinner,
      supplement,
      memo,
      timestamp: Timestamp.now(),
    });
    console.log("データを Firestore に保存しました");
  } catch (e) {
    console.error("データ保存エラー:", e);
  }
}

export async function getData(date: string) {
  try {
    const docRef = doc(db, "userData", date);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docRef = doc(db, "userData", date);
      console.log("保存先の docRef:", docRef.path);
      console.log("getApps:", getApps());
      const app = getApp();
      console.log("App Options:", app.options);

      console.log("データを取得しました");
      return docSnap.data();
    }
    console.log("データが存在しません");
    return null;
  } catch (e) {
    console.error("データ取得エラー:", e);
    return null;
  }
}

export async function updateData(
  date: string,
  updatedFields: Partial<{
    stroll: boolean;
    breakfast: boolean;
    dinner: boolean;
    supplement: boolean;
    memo: string;
  }>
) {
  try {
    const docRef = doc(db, "userData", date);
    await updateDoc(docRef, updatedFields);
    console.log("データを更新しました");
  } catch (e) {
    console.error("データ更新エラー:", e);
  }
}

export async function deleteData(date: string) {
  try {
    const docRef = doc(db, "userData", date);
    await deleteDoc(docRef);
    console.log("データを削除しました");
  } catch (e) {
    console.error("データ削除エラー:", e);
  }
}

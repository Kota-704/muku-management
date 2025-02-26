import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDocFromCache,
  getDocFromServer,
} from "firebase/firestore";

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
  } catch (e) {
    console.error("データ保存エラー:", e);
  }
}

export async function getData(date: string) {
  try {
    const docRef = doc(db, "userData", date);
    const docSnap = await getDocFromCache(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (e) {
    console.error("データ取得エラー:", e);
    try {
      const docRef = doc(db, "userData", date);
      const docSnap = await getDocFromServer(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (e) {
      console.error("データ取得エラー:", e);
    }
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
  } catch (e) {
    console.error("データ更新エラー:", e);
  }
}

export async function deleteData(date: string) {
  try {
    const docRef = doc(db, "userData", date);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("データ削除エラー:", e);
  }
}

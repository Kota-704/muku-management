import { db } from "@/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export async function saveData(
  date: string,
  supplement: boolean,
  message: string
) {
  try {
    await setDoc(doc(collection(db, "userData"), date), {
      supplement,
      message,
    });
    console.log("データを Firestore に保存しました");
  } catch (e) {
    console.error("データ保存エラー:", e);
  }
}

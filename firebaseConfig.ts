// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; // Firestore
import { getAuth, connectAuthEmulator } from "firebase/auth"; // Auth
import { getStorage, connectStorageEmulator } from "firebase/storage"; // Storage
import { getAnalytics } from "firebase/analytics"; // Analytics
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"; // Functions
import { getPerformance } from "firebase/performance"; // Performance
import { getRemoteConfig } from "firebase/remote-config"; // Remote Config
import { getMessaging } from "firebase/messaging"; // Messaging
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFyiyeJ_9nJC6k6KUkVXNhftrLPo-VCvA",
  authDomain: "muku-management.firebaseapp.com",
  projectId: "muku-management",
  storageBucket: "muku-management.firebasestorage.app",
  messagingSenderId: "803023395277",
  appId: "1:803023395277:web:1b697e1ebdba6cf6184c84",
  measurementId: "G-CM2ZYD5YFG",
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// Firebase サービスを取得
export const db = getFirestore(app); // Firestore
export const auth = getAuth(app); // Firebase Auth
export const storage = getStorage(app); // Cloud Storage
export const analytics = getAnalytics(app); // Google Analytics
export const functions = getFunctions(app); // Cloud Functions
export const performance = getPerformance(app); // Performance Monitoring
export const remoteConfig = getRemoteConfig(app); // Remote Config
export const messaging = getMessaging(app); // Cloud Messaging
export const database = getDatabase(app); // Realtime Database

// **エミュレーター環境での接続**（ローカル開発用）
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectDatabaseEmulator(database, "localhost", 9000);
}

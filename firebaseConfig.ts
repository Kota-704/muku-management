// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
// import { getAuth, connectAuthEmulator } from "firebase/auth"; // Auth
import { getStorage } from "firebase/storage"; // Storage
// import { getAnalytics } from "firebase/analytics"; // Analytics
import { getFunctions } from "firebase/functions"; // Functions
// import { getPerformance } from "firebase/performance"; // Performance
// import { getRemoteConfig } from "firebase/remote-config"; // Remote Config
// import { getMessaging } from "firebase/messaging"; // Messaging
// import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// Firebase サービスを取得
export const db = getFirestore(app); // Firestore
// export const auth = getAuth(app); // Firebase Auth
export const storage = getStorage(app); // Cloud Storage
// export const analytics = getAnalytics(app); // Google Analytics
export const functions = getFunctions(app); // Cloud Functions
// export const performance = getPerformance(app); // Performance Monitoring
// export const remoteConfig = getRemoteConfig(app); // Remote Config
// export const messaging = getMessaging(app); // Cloud Messaging
// export const database = getDatabase(app); // Realtime Database

// **エミュレーター環境での接続**（ローカル開発用）
// if (process.env.NODE_ENV === "development") {
//   connectFirestoreEmulator(db, "localhost", 8080);
//   // connectAuthEmulator(auth, "http://localhost:9099");
//   connectStorageEmulator(storage, "localhost", 9199);
//   connectFunctionsEmulator(functions, "localhost", 5001);
//   // connectDatabaseEmulator(database, "localhost", 9000);
// }

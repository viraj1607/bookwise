import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-O0WczXeFePVhfaqSDMQIeGXeP0BwSQg",
  authDomain: "bookwise-1f197.firebaseapp.com",
  projectId: "bookwise-1f197",
  storageBucket: "bookwise-1f197.firebasestorage.app",
  messagingSenderId: "89098594260",
  appId: "1:89098594260:web:ed41050ca07208e0705841",
  measurementId: "G-RSSPZCNVQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
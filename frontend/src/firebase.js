import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuPNAy4WpWopZfn5z7AVbGjHeQI0mFxnE",
  authDomain: "drivershub-d3e18.firebaseapp.com",
  projectId: "drivershub-d3e18",
  storageBucket: "drivershub-d3e18.firebasestorage.app",
  messagingSenderId: "569078327596",
  appId: "1:569078327596:web:b6e174e9ca52a1a5056489",
  measurementId: "G-XWENFYLKV6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

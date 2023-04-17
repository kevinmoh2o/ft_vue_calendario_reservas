import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkN3AY8f9vDm-Gg9h71Q2vEe77SPfAXAI",
  authDomain: "luna-covid-efwqev.firebaseapp.com",
  databaseURL: "https://luna-covid-efwqev.firebaseio.com",
  projectId: "luna-covid-efwqev",
  storageBucket: "luna-covid-efwqev.appspot.com",
  messagingSenderId: "723563394834",
  appId: "1:723563394834:web:9ff50975b7e18d317ce5cb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {
  auth,
  firestore
};
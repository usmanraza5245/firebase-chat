import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBBsNrw1AbYTrBk955a0TBj7-hIjT8YG2g",
//   authDomain: "chat-1abd5.firebaseapp.com",
//   projectId: "chat-1abd5",
//   storageBucket: "chat-1abd5.appspot.com",
//   messagingSenderId: "357226928657",
//   appId: "1:357226928657:web:267fbd2bd6a2c3c6dfefb0",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDF2DCXTkG67k1TrC2cBiaAiRkDqfhdr4A",
  authDomain: "fir-chat-1d306.firebaseapp.com",
  projectId: "fir-chat-1d306",
  storageBucket: "fir-chat-1d306.appspot.com",
  messagingSenderId: "817038996488",
  appId: "1:817038996488:web:114f2ca2c26532d3928dbd",
  measurementId: "G-7F1B40ZFYX",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };

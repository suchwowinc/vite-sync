import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCoTVjTinPCAhkLkbk3e2VXMr0LQuqDHr8",
  authDomain: "vite-sync-55dcb.firebaseapp.com",
  projectId: "vite-sync-55dcb",
  storageBucket: "vite-sync-55dcb.appspot.com",
  messagingSenderId: "928762970321",
  appId: "1:928762970321:web:5bf401fbc58f41f06085f0"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = fb.firestore();

export {
  db
}

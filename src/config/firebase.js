import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAi4f1cvZGyGkdy-NSxMiOP1K5AWTnkvX8",
    authDomain: "tasks-c6bf8.firebaseapp.com",
    projectId: "tasks-c6bf8",
    storageBucket: "tasks-c6bf8.appspot.com",
    messagingSenderId: "189339100290",
    appId: "1:189339100290:web:cc1419fcd106baf625c09b"
};

const app = initializeApp(firebaseConfig);

export default app;
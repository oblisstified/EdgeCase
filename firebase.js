// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDzWNIEvrhIcJzwjkyAf7Pa_3XlLA8juo4",

  authDomain: "food-logging-b0aaa.firebaseapp.com",

  projectId: "food-logging-b0aaa",

  storageBucket: "food-logging-b0aaa.appspot.com",

  messagingSenderId: "402801930799",

  appId: "1:402801930799:web:f920a338a2b554eca5ccda"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
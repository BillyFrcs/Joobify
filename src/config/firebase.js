// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.ApiKey,
    authDomain: process.env.AuthDomain,
    databaseURL: process.env.DatabaseURL,
    projectId: process.env.ProjectID,
    storageBucket: process.env.StorageBucket,
    messagingSenderId: process.env.MessagingSenderID,
    appId: process.env.AppID,
    measurementId: process.env.MeasurementID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
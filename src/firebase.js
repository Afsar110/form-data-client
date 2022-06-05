import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBHT9gK_cZZec4Z9Bvn3u0MYgJMUbEKZJM",
    authDomain: "my-message-form.firebaseapp.com",
    projectId: "my-message-form",
    storageBucket: "my-message-form.appspot.com",
    messagingSenderId: "167369410596",
    appId: "1:167369410596:web:1b0e265798e6fc6fbb30b1",
    measurementId: "G-Q915P43E8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {auth, app}
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7OePNp-Wu-2Hmg9-x_DRAmHzDcr1t_Ao",
    authDomain: "qrmenu-dev.firebaseapp.com",
    databaseURL: "https://qrmenu-dev.firebaseio.com",
    projectId: "qrmenu-dev",
    storageBucket: "qrmenu-dev.appspot.com",
    messagingSenderId: "428684127389",
    appId: "1:428684127389:web:8c9d70923e9c988b",
    measurementId: "G-SE8GS4JC9S",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;

// Optionally import the services that you want to use
import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDcjSlqW579I6cGEOXkeLHh1hIyw93kkaY",
    authDomain: "newslenz-842bc.firebaseapp.com",
    projectId: "newslenz-842bc",
    storageBucket: "newslenz-842bc.appspot.com",
    messagingSenderId: "655946425892",
    appId: "1:655946425892:web:032c286422330d6cb4dab1",
    measurementId: "G-DD56T8PHT3"
};

export const FIREBSE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBSE_APP);
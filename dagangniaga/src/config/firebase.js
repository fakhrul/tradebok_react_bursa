import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBDDvuXGAxYl7oH9U9WFZTOxBrKbYjlG6U",
    authDomain: "tradebok-cc46e.firebaseapp.com",
    databaseURL: "https://tradebok-cc46e.firebaseio.com",
    projectId: "tradebok-cc46e",
    storageBucket: "tradebok-cc46e.appspot.com",
    messagingSenderId: "91921130468",
    appId: "1:91921130468:web:93de39184aff46187fddf1",
    measurementId: "G-BZYXKE7KWE"
};

firebase.initializeApp(config);

export const fb = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
import firebase from 'firebase';
require('@firebase/firestore')


var firebaseConfig = {
    apiKey: "AIzaSyAF0CfqEceG5lAGZFewC8qip2CJvYbcMMU",
    authDomain: "shopping-list-app-1807a.firebaseapp.com",
    projectId: "shopping-list-app-1807a",
    storageBucket: "shopping-list-app-1807a.appspot.com",
    messagingSenderId: "1021988273325",
    appId: "1:1021988273325:web:e2777c08053a3c44d65a24"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()
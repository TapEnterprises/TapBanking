import firebase from "firebase";

const config = {
  //instert firebase config
  apiKey: "AIzaSyCaRlf2kYUnCVb-OMPgt4LVOsXTH8rmky4",
  authDomain: "tapbanking.firebaseapp.com",
  databaseURL: "https://tapbanking.firebaseio.com",
  projectId: "tapbanking",
  storageBucket: "tapbanking.appspot.com",
  messagingSenderId: "558114320552"
};

const firebaseInit = firebase.initializeApp(config);
export default firebaseInit;

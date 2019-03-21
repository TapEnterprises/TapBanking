import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/Login/login";
import Plaid from "./components/PlaidLink/plaidlink";
import firebase from "firebase";
import db from "./components/Configuration/firebase";

let hasToken = false;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    const docRef = db.collection("users").doc(uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        if (data.access_token) {
          console.log("Has Access token");
          hasToken = true;
        } else {
          console.log("Doesn't have Access token");
          hasToken = false;
        }
      }
    });
  } else {
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  if (hasToken === true) {
    ReactDOM.render(<App user={user} />, document.getElementById("root"));
  } else {
    ReactDOM.render(<Plaid />, document.getElementById("root"));
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

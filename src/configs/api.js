import store from "../redux/store";
import axois from "axios";
import {
  setTransactions,
  setAccounts,
  addTransactions,
  setFirebaseData
} from "../redux/actions";
import React from "react";
import db from "./firebase";
import { toast } from "react-toastify";
import history from "./history";

const currentDate = new Date();
let total_transactions = 0;
let loadingTransactions = false;

export const pullVitalData = async () => {
  const { access_token } = store.getState().firebaseData;
  const { user } = store.getState();

  if (user) {
    const uid = user.uid;
    const docRef = db.collection("users").doc(uid);

    if (!access_token) {
      const doc = await docRef.get();
      if (doc.exists) {
        const data = doc.data();
        if (data.access_token) {
          store.dispatch(setFirebaseData(data));
          pullInitialTransactions();
        } else if (data.dontSkip) {
          handleToast();
        }
      } else {
        docRef.set({
          access_token: null,
          dontSkip: true
        });
        handleToast();
      }
    } else {
      pullInitialTransactions();
    }
  }
};

export const pullInitialTransactions = () => {
  const { transactions, firebaseData } = store.getState();
  const { access_token } = firebaseData;

  if (transactions.length === 0 && !loadingTransactions) {
    loadingTransactions = true;

    return axois
      .post(
        "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/transactions",
        {
          access_token: access_token,
          startDate: "1970-01-01",
          endDate: currentDate.toISOString().split("T")[0]
        }
      )
      .then(res => {
        let { transactions, accounts } = res.data.transactions;

        total_transactions = res.data.transactions.total_transactions;

        store.dispatch(setTransactions(transactions));
        store.dispatch(setAccounts(accounts));
        loadingTransactions = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const pullMoreTransactions = async () => {
  const { firebaseData, transactions } = store.getState();
  const { access_token } = firebaseData;
  const offset = transactions.length;

  if (offset !== total_transactions) {
    const res = await axois.post(
      "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/transactions",
      {
        access_token,
        startDate: "1970-01-01",
        endDate: currentDate.toISOString().split("T")[0],
        offset
      }
    );
    store.dispatch(addTransactions(res.data.transactions.transactions));
  }
};

const redirect = () => {
  history.push("/plaidlink");
};

const handleToast = () => {
  if (!toast.isActive("mainToast")) {
    toast(
      <div style={{ color: "black" }} onClick={redirect}>
        You have not logged in with your bank. <br />{" "}
        <strong>
          Click to add{" "}
          <span role="img" aria-label="bank">
            🏦
          </span>
        </strong>
      </div>,
      {
        toastId: "mainToast",
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  }
};

store.subscribe(pullVitalData);

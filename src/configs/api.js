import store from "../redux/store";
import axois from "axios";
import {
  setTransactions,
  setAccounts,
  addTransactions,
  setAccessToken
} from "../redux/actions";
import db from "./firebase";

const currentDate = new Date();
let offset = 0;
let total_transactions = 0;

export const pullVitalData = async toastCB => {
  const { access_token } = store.getState();
  const { user } = store.getState();
  const uid = user.uid;
  const docRef = db.collection("users").doc(uid);
  if (!access_token) {
    const doc = await docRef.get();
    if (doc.exists) {
      const data = doc.data();
      if (data.access_token) {
        store.dispatch(setAccessToken(data.access_token));
        pullInitialTransactions();
      } else if (data.dontSkip) {
        toastCB();
      }
    } else {
      docRef.set({
        access_token: null,
        dontSkip: true
      });
      toastCB();
    }
  } else {
    pullInitialTransactions();
  }
};

export const pullInitialTransactions = () => {
  const { transactions, access_token } = store.getState();

  if (transactions.length === 0) {
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
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const pullMoreTransactions = async () => {
  const { access_token } = store.getState();

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
    offset += res.data.transactions.transactions.length;
  }
};

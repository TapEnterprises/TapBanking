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

export const pullVitalData = toastCB => {
  const { access_token } = store.getState();
  const { user } = store.getState();
  const uid = user.uid;
  const docRef = db.collection("users").doc(uid);
  if (!access_token) {
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data.access_token) {
            store.dispatch(setAccessToken(data.access_token));
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
      })
      .then(() => pullInitialTransactions());
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
          startDate: new Date(
            new Date().setFullYear(currentDate.getFullYear() - 1)
          )
            .toISOString()
            .split("T")[0],
          endDate: currentDate.toISOString().split("T")[0]
        }
      )
      .then(res => {
        let { transactions, accounts } = res.data.transactions;

        store.dispatch(setTransactions(transactions));
        store.dispatch(setAccounts(accounts));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const pullMoreTransactions = () => {
  const { transactions, access_token } = store.getState();

  let lastDate = new Date(transactions[transactions.length - 1].date);
  let newDate = new Date();
  newDate.setFullYear(lastDate.getFullYear() - 1);
  newDate = newDate.toISOString().split("T")[0];
  lastDate.setDate(lastDate.getDay() - 1);
  lastDate = lastDate.toISOString().split("T")[0];
  return axois
    .post(
      "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/transactions",
      {
        access_token,
        startDate: newDate,
        endDate: lastDate
      }
    )
    .then(res => {
      store.dispatch(addTransactions(res.data.transactions.transactions));
    })
    .catch(err => {
      console.log(err);
    });
};

import {
  SET_USER,
  SET_ACCOUNTS,
  SET_TRANSACTIONS,
  ADD_TRANSACTIONS
} from "./reducers/actionTypes";

export const setUser = value => ({
  type: SET_USER,
  payload: value
});

export const setAccounts = value => ({
  type: SET_ACCOUNTS,
  payload: value
});

export const setTransactions = value => ({
  type: SET_TRANSACTIONS,
  payload: value
});

export const addTransactions = value => ({
  type: ADD_TRANSACTIONS,
  payload: value
});

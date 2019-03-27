import {
  SET_USER,
  SET_ACCOUNTS,
  SET_TRANSACTIONS,
  ADD_TRANSACTIONS
} from "./actionTypes";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload
      };

    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };

    case ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload]
      };

    default:
      return state;
  }
};

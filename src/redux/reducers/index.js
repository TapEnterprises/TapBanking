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

    case SET_TRANSACTIONS: {
      let categories = [];

      for (let trans of action.payload) {
        for (let cat of trans.category) {
          if (!categories.includes(cat)) {
            categories.push(cat);
          }
        }
      }

      return {
        ...state,
        transactions: action.payload,
        categories
      };
    }

    case ADD_TRANSACTIONS: {
      let categories = state.categories;

      for (let trans of action.payload) {
        for (let cat of trans.category) {
          if (!categories.includes(cat)) {
            categories.push(cat);
          }
        }
      }

      return {
        ...state,
        transactions: [...state.transactions, ...action.payload]
      };
    }

    default:
      return state;
  }
};

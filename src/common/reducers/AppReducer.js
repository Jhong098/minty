import {
  GET_TRANSACTIONS,
  GET_BALANCES,
  UPDATE_TRANSACTIONS
} from '../actions/AppActions';

const initialState = {
  transactions: [],
  balances: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS :
      // console.log('get trans called')
      return {
        ...state, transactions: action.transactions,
      };

    case UPDATE_TRANSACTIONS :
      // console.log('get trans called')
      return {
        ...state, transactions: action.transactions,
      };

    case GET_BALANCES :
      return {
        ...state, balances: action.balances,
      };

    default:
      // console.log('default called')
      return state;
  }
};

export const getTransactions = state => state.app.transactions;

// Get Balances
export const getBalances = state => state.app.balances;

export default AppReducer;

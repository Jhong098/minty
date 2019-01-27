import { ADD_TRANSACTION, ADD_TRANSACTIONS } from './DashActions';

const initialState = { data: [] };

const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION :
      return {
        data: [action.data, ...state.data],
      };

    case ADD_TRANSACTIONS :
      return {
        data: action.transactions,
      };

    default:
      return state;
  }
};

// Get all posts
export const getTransactions = state => state.dash.data;

// Get post by cuid
export const getTransaction = (state, cuid) => state.data.filter(transaction => transaction.cuid === cuid)[0];

// Export Reducer
export default TransactionReducer;

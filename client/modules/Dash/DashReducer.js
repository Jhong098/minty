import { ADD_TRANSACTION, GET_TRANSACTIONS, GET_AMOUNT_BY_DAY, GET_CATEGORY_COUNTS } from './DashActions';

const initialState = { data: [] };

const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION :
      return {
        data: [action.data, ...state.data],
      };

    case GET_TRANSACTIONS :
      return {
        ...state, transactions: action.transactions,
      };

    case GET_AMOUNT_BY_DAY :
      return {
        ...state, amounts: action.amounts,
      };

    case GET_CATEGORY_COUNTS :
      console.log(action.counts)
      return {
        ...state, counts: action.counts,
      };

    default:
      return state;
  }
};

// Get all posts
export const getTransactions = state => state.dash.transactions;

// Get post by cuid
export const getTransaction = (state, cuid) => state.data.filter(transaction => transaction.cuid === cuid)[0];

// Get amounts by day
export const getAmountsByDay = state => state.dash.amounts;

// Get category counts
export const getCategoryCounts = state => state.dash.counts;

// Export Reducer
export default TransactionReducer;

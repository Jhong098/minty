import { ADD_TRANSACTION, ADD_TRANSACTIONS, GET_AMOUNT_BY_DAY } from './DashActions';

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

    case GET_AMOUNT_BY_DAY :
    console.log(action)
      return {
        ...state, amounts: action.amounts,
      };

    default:
      return state;
  }
};

// Get all posts
export const getTransactions = state => state.dash.data;

// Get post by cuid
export const getTransaction = (state, cuid) => state.data.filter(transaction => transaction.cuid === cuid)[0];

// Get amounts by day
export const getAmountsByDay = state => state.dash.amounts;

// Export Reducer
export default TransactionReducer;

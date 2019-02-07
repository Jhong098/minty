import {
  // ADD_TRANSACTION,
  GET_TRANSACTIONS,
  GET_AMOUNT_BY_DAY,
  GET_CATEGORY_COUNTS,
  GET_BALANCES,
} from './DashActions';

const initialState = {
  transactions: [],
  amounts: [],
  counts: [],
  balances: [],
};

const DashReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_TRANSACTION :
    //  console.log('add called')
    //   return {
    //     data: [action.data, ...state.data],
    //   };

    case GET_TRANSACTIONS :
      // console.log('get trans called')
      return {
        ...state, transactions: action.transactions,
      };

    case GET_AMOUNT_BY_DAY :
      // console.log('get amounts called')
      return {
        ...state, amounts: action.amounts,
      };

    case GET_CATEGORY_COUNTS :
      // console.log('get counts called')
      return {
        ...state, counts: action.counts,
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

// Get post by cuid
// export const getTransaction = (state, cuid) => state.data.filter(transaction => transaction.cuid === cuid)[0];

// Get amounts by day
export const getAmountsByDay = state => state.dash.amounts;

// Get category counts
export const getCategoryCounts = state => state.dash.counts;

// Export Reducer
export default DashReducer;

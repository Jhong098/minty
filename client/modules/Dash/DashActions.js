import callApi from '../../util/apiCaller';
import { processCatogoriesData } from '../../util/processData';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const GET_AMOUNT_BY_DAY = 'GET_AMOUNT_BY_DAY';
export const GET_CATEGORY_COUNTS = 'GET_CATEGORY_COUNTS';
export const GET_BALANCES = 'GET_BALANCES';

export function getTransactions(transactions) {
  return {
    type: GET_TRANSACTIONS,
    transactions,
  };
}

export function addTransaction(transaction) {
  return {
    type: ADD_TRANSACTION,
    transaction,
  };
}

export function getAmountsByDay(amounts) {
  return {
    type: GET_AMOUNT_BY_DAY,
    amounts,
  };
}

export function getCategoryCounts(counts) {
  return {
    type: GET_CATEGORY_COUNTS,
    counts,
  };
}

export function getBalances(balances) {
  return {
    type: GET_BALANCES,
    balances,
  };
}

export function fetchTransactions() {
  return (dispatch) => {
    return callApi('transactions').then(res => {
      dispatch(getTransactions(res.transactions));
    });
  };
}

export function fetchTransaction(cuid) {
  return (dispatch) => {
    return callApi(`transactions/${cuid}`).then(res => dispatch(addTransaction(res.transaction)));
  };
}

export function fetchAmountsByDay() {
  return (dispatch) => {
    return callApi('transactionAmountsByDay').then(res => {
      dispatch(getAmountsByDay(res.result));
    });
  };
}

export function fetchCategoryCounts() {
  return (dispatch) => {
    return callApi('transactionsCountByCategory').then(res => {
      dispatch(getCategoryCounts(processCatogoriesData(res.result)));
    });
  };
}

export function fetchBalances() {
  return (dispatch) => {
    return callApi('balances').then(res => {
      dispatch(getBalances(res.balances));
    });
  };
}

export function fetchDashData() {
  console.log('called fetch')
  return dispatch => Promise.all([
    dispatch(fetchBalances()),
    dispatch(fetchTransactions()),
    dispatch(fetchAmountsByDay()),
    dispatch(fetchCategoryCounts()),
  ]);
}

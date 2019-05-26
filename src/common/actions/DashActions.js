import callApi from '../util/apiCaller';
import { processCatogoriesData } from '../util/processData';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const GET_AMOUNT_BY_DAY = 'GET_AMOUNT_BY_DAY';
export const GET_CATEGORY_COUNTS = 'GET_CATEGORY_COUNTS';

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

export function fetchTransaction(cuid) {
  return (dispatch) => {
    return callApi(`transactions/${cuid}`).then(res => dispatch(addTransaction(res.transaction)));
  };
}

export function fetchAmountsByDay() {
  return (dispatch, getState) => {
    const { isAuthenticated } = getState().auth;
    return callApi(isAuthenticated ? 'transactionAmountsByDay' : 'mockTransactionAmountsByDay').then(res => {
      dispatch(getAmountsByDay(res.result));
    });
  };
}

export function fetchCategoryCounts() {
  return (dispatch, getState) => {
    const { isAuthenticated } = getState().auth;
    return callApi(isAuthenticated ? 'transactionsCountByCategory' : 'mockTransactionsCountByCategory').then(res => {
      dispatch(getCategoryCounts(processCatogoriesData(res.result)));
    });
  };
}

export function fetchDashData() {
  return dispatch => Promise.all([
    dispatch(fetchAmountsByDay()),
    dispatch(fetchCategoryCounts()),
  ]);
}

import callApi from '../../client/util/apiCaller';
import { processCatogoriesData } from '../../client/util/processData';

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



export function fetchDashData() {
  console.log('called dash fetch')
  return dispatch => Promise.all([
    dispatch(fetchAmountsByDay()),
    dispatch(fetchCategoryCounts()),
  ]);
}

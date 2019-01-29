import callApi from '../../util/apiCaller';

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const GET_AMOUNT_BY_DAY = 'GET_AMOUNT_BY_DAY';

export function addTransactions(transactions) {
  return {
    type: ADD_TRANSACTIONS,
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

export function fetchTransactions() {
  return (dispatch) => {
    return callApi('transactions').then(res => {
      dispatch(addTransactions(res.transactions));
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
      dispatch(getAmountsByDay(res.amounts));
    });
  };
}

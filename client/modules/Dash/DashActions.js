import callApi from '../../util/apiCaller';

export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

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

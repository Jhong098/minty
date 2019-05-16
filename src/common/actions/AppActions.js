import callApi from '../util/apiCaller';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_BALANCES = 'GET_BALANCES';


export function getTransactions(transactions) {
  return {
    type: GET_TRANSACTIONS,
    transactions,
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

export function fetchBalances() {
  return (dispatch) => {
    return callApi('balances').then(res => {
      dispatch(getBalances(res.balances));
    });
  };
}

export function fetchAppData() {
  console.log('called app fetch')
  return dispatch => Promise.all([
    dispatch(fetchBalances()),
    dispatch(fetchTransactions()),
  ]);
}

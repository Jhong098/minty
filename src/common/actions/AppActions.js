import callApi from '../util/apiCaller';
import writeTransactionsToDB from "../../server/lib/writeTransactionsToDB";
import { fetchDashData } from "./DashActions";

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_BALANCES = 'GET_BALANCES';
export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS';


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

export function updateTransactions(transactions) {
  return {
    type: UPDATE_TRANSACTIONS,
    transactions
  };
}

export const fetchTransactions = () => {
  return (dispatch, getState) => {
    const { isAuthenticated, user } = getState().auth;
    return callApi(isAuthenticated ? 'transactions' : 'mockTransactions', user).then(res => {
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
  return dispatch => Promise.all([
    dispatch(fetchBalances()),
    dispatch(fetchTransactions()),
  ]);
}

export const dispatchUpdateTransactions = () => {
  return (dispatch, getState) => {
    const { isAuthenticated, user } = getState().auth;
    return callApi('transactions/update', isAuthenticated ? user : {}).then(() => {
      return dispatch(fetchTransactions());
    })
  }
}

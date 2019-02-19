import callApi from '../../util/apiCaller';
import axios from 'axios';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_BALANCES = 'GET_BALANCES';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

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

export const registerUser = (user, history) => dispatch => {
  axios.post('/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user) => dispatch => {
  axios.post('/api/users/login', user)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

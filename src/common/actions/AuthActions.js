import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';

export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const registerUser = (user, router) => dispatch => {
  console.log("registering")
  axios.post('/api/users/register', user)
    .then(res => {
      console.log('register success!')
      router.push('/login')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const loginUser = (user, router) => dispatch => {
  axios.post('/api/users/login', user)
    .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);

        localStorage.setItem('jwtToken', token);
        setAuthToken(token);

        dispatch(setCurrentUser(decoded));
        console.log('login success!')
        router.push('/dash');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const logoutUser = router => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  router.push('/login');
}

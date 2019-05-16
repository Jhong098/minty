import { GET_ERRORS, SET_CURRENT_USER } from '../actions/AuthActions';
import isEmpty from '../util/isEmpty';

const initialState = {
  errors: {},
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      console.log('got errors')
      return {
        ...state, errors: action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}

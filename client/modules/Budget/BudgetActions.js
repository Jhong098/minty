import callApi from '../../util/apiCaller';
import { retrieveCategories } from '../../util/processData';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  };
}

export function fetchCategories() {
  return (dispatch) => {
    return callApi('transactionsCountByCategory').then(res => {
      dispatch(getCategories(retrieveCategories(res.result)));
    });
  };
}

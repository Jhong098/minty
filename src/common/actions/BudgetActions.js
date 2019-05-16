import callApi from '../util/apiCaller';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  };
}

function extractCategories(data) {
  const categories = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty('category')) {
      for (let j = 0; j < data[i].category.length; j++) {
        if (!categories.includes(data[i].category[j][0])) {
          categories.push(data[i].category[j][0]);
        }
      }
    }
  }
  return categories;
}

export function fetchCategories() {
  return (dispatch) => {
    return callApi('transactions').then(res => {
      dispatch(getCategories(extractCategories(res.transactions)));
    });
  };
}

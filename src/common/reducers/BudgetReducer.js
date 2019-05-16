import { GET_CATEGORIES } from '../actions/BudgetActions';

const initialState = {
  categories: [],
};

const BudgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES :
      console.log('in reducer')
      console.log(action.categories)
      return {
        ...state, categories: action.categories,
      };

    default :
      return state;
  }
};

export const getCategories = state => {
  if (state.budget.categories.length) {
    return state.budget.categories;
  }
};

export default BudgetReducer;

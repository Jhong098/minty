import { GET_CATEGORIES } from './BudgetActions';

const initialState = {
  categories: [],
};

const BudgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state, categories: action.categories,
      };

    default :
      return state;
  }
};

export const getCategories = state => state.budget.categories;

export default BudgetReducer;

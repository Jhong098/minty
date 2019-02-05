/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import intl from './modules/Intl/IntlReducer';
import app from './modules/App/AppReducer';
import dash from './modules/Dash/DashReducer';
import budget from './modules/Budget/BudgetReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  intl,
  app,
  dash,
  budget,
});

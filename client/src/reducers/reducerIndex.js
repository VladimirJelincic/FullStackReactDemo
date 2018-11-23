import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  router: routerReducer
});
export default rootReducer;

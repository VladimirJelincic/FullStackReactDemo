import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  router: routerReducer,
  form: formReducer
});
export default rootReducer;

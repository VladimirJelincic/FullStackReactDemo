import { AUTH_USER, AUTH_ERROR, AUTH_CHANGE } from './../actions/actionTypes';
const INITIAL_STATE = {
  authenticated: '',
  errerrorMessage: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload, errorMessage: '' };
    case AUTH_CHANGE:
      return { ...state, message: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload ,message:''};
    default:
      return state;
  }
};

import { AUTH_USER, AUTH_ERROR, AUTH_GET_USER } from './../actions/actionTypes';
const INITIAL_STATE = {
  authenticated: '',
  errerrorMessage: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload, errorMessage: '' };
    case AUTH_GET_USER:
      return { ...state, user: action.payload, errorMessage: '' };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

import { USERS_GET, USERS_ERROR } from './../actions/actionTypes';

const INITIAL_STATE = {
  usersList: [],
  errorMessage: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_GET:
      return { ...state, usersList: action.payload, errorMessage: '' };
    case USERS_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

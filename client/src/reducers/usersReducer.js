import { USERS_GET, USERS_ERROR, USER_LIKE, USER_UNLIKE } from './../actions/actionTypes';

const INITIAL_STATE = {
  usersList: [],
  errorMessage: ''
};
const sortByLike = (a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0);

export default (state = INITIAL_STATE, action) => {
  let newUserList;
  switch (action.type) {
    case USERS_GET:
      return { ...state, usersList: action.payload, errorMessage: '' };
    case USERS_ERROR:
      return { ...state, errorMessage: action.payload };
    case USER_LIKE:
      const userToLike = state.usersList.find(e => e._id === action.payload.id);
      userToLike.likedBy.push({ email: action.payload.user.email, _id: action.payload.user._id });
      userToLike.likes++;
      newUserList = [...state.usersList.filter(e => e._id !== userToLike._id), userToLike].sort(sortByLike);
      return { ...state, usersList: newUserList, errorMessage: '' };
    case USER_UNLIKE:
      const userToUnLike = state.usersList.find(e => e._id === action.payload.id);
      userToUnLike.likedBy = userToUnLike.likedBy.filter(e => e._id !== action.payload.user._id);
      userToUnLike.likes--;
      newUserList = [...state.usersList.filter(e => e._id !== userToUnLike._id), userToUnLike].sort(sortByLike);
      return { ...state, usersList: newUserList, errorMessage: '' };

    default:
      return state;
  }
};

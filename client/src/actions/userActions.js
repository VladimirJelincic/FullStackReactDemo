import axios from 'axios';
import { USERS_GET, USERS_ERROR, USER_LIKE, USER_UNLIKE, USER_GET_ME, USER_GET } from './actionTypes';

export const getUsers = () => async dispatch => {
  try {
    const response = await axios.get('/most-liked');

    dispatch({ type: USERS_GET, payload: response.data });
  } catch (e) {
    dispatch({ type: USERS_ERROR, payload: e.response.data.error });
  }
};
export const getUser = id => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`/user/${id}`, {
      headers: { Authorization: token }
    });

    dispatch({ type: USER_GET, payload: response.data });
  } catch (e) {
    dispatch({ type: USERS_ERROR, payload: e.response.data.error });
  }
};
export const getMe = callback => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('/me', {
      headers: { Authorization: token }
    });

    if (callback) {
      callback();
    }
    dispatch({ type: USER_GET_ME, payload: response.data });
  } catch (e) {
    dispatch({ type: USERS_ERROR, payload: 'Error retrieving profile' });
  }
};
export const likeUser = (id, user) => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`/user/${id}/like`, null, {
      headers: { Authorization: token }
    });

    dispatch({ type: USER_LIKE, payload: { user, id, response } });
  } catch (e) {
    dispatch({ type: USERS_ERROR, payload: 'And error occured' });
  }
};
export const unLikeUser = (id, user) => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`/user/${id}/unlike`, null, {
      headers: { Authorization: token }
    });

    dispatch({ type: USER_UNLIKE, payload: { user, id, response } });
  } catch (e) {
    dispatch({ type: USERS_ERROR, payload: 'And error occured' });
  }
};

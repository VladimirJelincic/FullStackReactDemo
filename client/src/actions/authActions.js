import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './actionTypes';

export const signup = (user, callback) => async dispatch => {
  try {
    const response = await axios.post('/signup', user);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    if (callback) {
      callback();
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR, payload: err.response.data.error });
  }
};

export const login = (user, callback) => async dispatch => {
  try {
    const response = await axios.post('/login', user);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);

    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'User not found' });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
};
export const clearErrorMessage = () => {
  return {
    type: AUTH_ERROR,
    payload: ''
  };
};
export const changePassword = (user, callback) => async dispatch => {
  try {
    const response = await axios.post('/me/update-password', user);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

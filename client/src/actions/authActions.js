import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, AUTH_GET_USER } from './actionTypes';

export const signup = (user, callback) => async dispatch => {
  try {
    const response = await axios.post('/signup', user);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH_ERROR, payload: e.response.data.error });
  }
};

export const login = (user, callback) => async dispatch => {
  try {
    const response = await axios.post('/login', user);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'User not found' });
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
    dispatch({ type: AUTH_GET_USER, payload: response.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Error retrieving profile' });
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
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: e });
  }
};

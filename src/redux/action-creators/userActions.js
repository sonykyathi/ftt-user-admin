import { setAlert } from './alertAction';

import api from '../../utils/api';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_SUCCESS,
  RESET,
} from '../types/user';

export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/api/v1/auth/login`, formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/api/v1/auth/register`, formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({
      type: REGISTER_FAILED,
    });
  }
};
// Logout
export const logout = () => ({ type: LOGOUT_SUCCESS });
// Reset
export const reset = () => ({ type: RESET });

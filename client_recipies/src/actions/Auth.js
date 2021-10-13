import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REQUEST_LOGIN,
  REQUEST_REGISTER,
} from '../types/Auth';
import { api } from '../services/api/Api';

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: REQUEST_LOGIN });
    const res = await api.login(loginPayload);

    if (res.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: res });
      localStorage.setItem('token', res.token);
      return { success: true, res };
    }

    dispatch({ type: LOGIN_ERROR, error: res.errors[0] });
    return { success: false, errors: res.errors[0] };
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, error: e });
  }
}

export async function registerUser(dispatch, registerPayload) {
  try {
    dispatch({ type: REQUEST_REGISTER });
    const res = await api.register(registerPayload);

    if (res.success) {
      dispatch({ type: REGISTER_SUCCESS, payload: res });
      localStorage.setItem('token', res.token);
      return { success: true, res };
    }

    dispatch({ type: REGISTER_ERROR, error: res.errors[0] });
    return { success: false, errors: res.errors[0] };
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, error: e });
  }
}

export function logout(dispatch) {
  dispatch({
    type: LOGOUT,
  });
  localStorage.removeItem('token');
}

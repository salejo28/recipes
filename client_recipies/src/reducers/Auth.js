import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REQUEST_LOGIN,
  REQUEST_REGISTER,
} from '../types/Auth';
let token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

export const initialState = {
  token: null || token,
  loading: false,
  error: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        token: action.payload.token,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };

    case REQUEST_REGISTER:
      return {
        ...initialState,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...initialState,
        token: action.payload.token,
        loading: false,
      };
    case REGISTER_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };

    case LOGOUT:
      return {
        ...initialState,
        token: null,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

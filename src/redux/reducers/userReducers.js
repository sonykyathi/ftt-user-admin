import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_SUCCESS,
  RESET,
} from '../types/user';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
  loading: true,
  success: false,
  token: JSON.parse(localStorage.getItem('token')),
  user: JSON.parse(localStorage.getItem('user')),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));

      // localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        // token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case REGISTER_FAILED:
    case LOGOUT_SUCCESS:
    case LOGIN_FAILED:
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
        success: false,
      };
    case RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
export default userReducer;

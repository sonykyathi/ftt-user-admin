import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT,LOGOUT_SUCCESS } from '../types';

export const setAlert = (msg, alertType, timeout = 2000) => (dispatch) => {
  const id = uuidv4();
  console.log('in alert function', msg, alertType, id);
  {
    if (msg === 'Bad Token') {
      dispatch({ type: LOGOUT_SUCCESS })
      Window.location.reload();
    }
  }
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

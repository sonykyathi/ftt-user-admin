import { combineReducers } from 'redux';
import userReducer from './userReducers';
import paymentReducer from './paymentReducers';
import alert from './alertReducers';

const reducers = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  alert
});

export default reducers;
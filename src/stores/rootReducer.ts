import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import countReducer from './count/countReducer';

export default combineReducers({
  countReducer,
  authReducer,
});

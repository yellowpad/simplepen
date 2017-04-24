import { combineReducers } from 'redux';
import auth from './authReducers';
import {reducer as notifcationReducer} from 'reapop';

const rootReducer = combineReducers({
  auth,
  notifications: notifcationReducer(),
});

export default rootReducer;

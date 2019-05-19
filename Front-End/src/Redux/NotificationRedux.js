import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationNotify: [ 'status', 'message' ],
  notificationClear: null
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  active: false,
  status: 'unknown',
  message: null
});

/* ------------- Reducers ------------- */

export const notify = (state, { status, message }) =>
  state.merge({ active: true, status, message });

export const clear = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_NOTIFY]: notify,
  [Types.NOTIFICATION_CLEAR]: clear
});

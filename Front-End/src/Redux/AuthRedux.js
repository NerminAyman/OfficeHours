import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: [ 'data' ],
  loginSuccess: [ 'token' ],
  loginFailure: [ 'error' ],
  check: null,
  logout: null,
  forceUpdate: null
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  error: null,
  loading: false,
  checked: false,
  user: {}
});

/* ------------- Reducers ------------- */

export const request = state =>
  state.merge({ loading: true });

export const success = (state, { token }) =>
  state.merge({ loading: false, error: null, token });

export const failure = (state, { error }) =>
  state.merge({ loading: false, error, token: null });

export const check = state =>
  state.merge({ loading: true, forceUpdate: new Date().getTime() });

export const logout = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: request,
  [Types.CHECK]: check,
  [Types.LOGOUT]: logout,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure
});

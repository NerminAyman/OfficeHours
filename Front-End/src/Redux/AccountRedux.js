import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountUpdate: [ 'data' ],
  accountPush: [ 'data' ],
  accountGet: null,
  accountChangePassword: [ 'data' ],
  accountSuccess: null,
  accountFailure: null
});

export const AccountTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  fetching: false,
  updated: false,
  error: null,
  data: {}
});

/* ------------- Reducers ------------- */

export const update = state =>
  state.merge({ loading: true });

export const get = state =>
  state.merge({ fetching: true });

export const changePassword = state =>
  state.merge({ loading: true });

export const push = (state, { data }) =>
  state.merge({ data });

export const success = state =>
  state.merge({
    loading: false,
    fetching: false,
    error: null,
    updated: new Date().getTime()
  });

export const failure = (state, { error }) =>
  state.merge({ loading: false, error, updated: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_UPDATE]: update,
  [Types.ACCOUNT_PUSH]: push,
  [Types.ACCOUNT_GET]: get,
  [Types.ACCOUNT_CHANGE_PASSWORD]: changePassword,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure
});

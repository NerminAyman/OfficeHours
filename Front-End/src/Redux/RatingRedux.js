
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rate: [ 'data' ],
  addSuccess: [ 'token' ],
  addFailure: [ 'error' ]
});
export const RateTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  token: null,
  data: {},
  error: null,
  loading: false,
  checked: false,
  user: {}
});

/* ------------- Reducers ------------- */

export const rate = state =>
  state.merge({ loading: true });
export const act = (state, { data }) =>
  state.merge({ loading: false, error: null, data });
export const success = (state, { token }) =>
  state.merge({ loading: false, error: null, token });
export const failure = (state, { error }) =>
  state.merge({ loading: false, error, token: null });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RATE]: rate,
  [Types.ADD_SUCCESS]: success,
  [Types.ADD_FAILURE]: failure
});

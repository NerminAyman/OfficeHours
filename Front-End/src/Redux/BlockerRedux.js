import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  blockerRun: null,
  blockerStop: null
});

export const BlockerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false
});

/* ------------- Reducers ------------- */

export const run = state =>
  state.merge({ loading: true });

export const stop = state =>
  state.merge({ loading: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BLOCKER_RUN]: run,
  [Types.BLOCKER_STOP]: stop
});

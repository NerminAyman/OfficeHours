import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tagsGet: null,
  tagPush: [ 'tags' ],
  tagSend: [ 'data' ],
  cardSend: [ 'data' ],
  tagSuccess: null,
  tagFailure: null
});

export const TagTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  fetching: false,
  error: null,
  data: {},
  tags: []
});

/* ------------- Reducers ------------- */

export const tagsGet = state =>
  state.merge({ fetching: true });

export const push = (state, { tags }) =>
  state.merge({ tags });

export const tagSend = (state, { data }) =>
  state.merge({ data });

export const cardSend = (state, { data }) =>
  state.merge({ data });

export const success = state =>
  state.merge({
    loading: false,
    fetching: false,
    error: null
  });

export const failure = (state, { error }) =>
  state.merge({ loading: false, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TAG_SEND]: tagSend,
  [Types.TAG_GET]: tagsGet,
  [Types.CARD_SEND]: cardSend,
  [Types.TAG_SUCCESS]: success,
  [Types.TAG_FAILURE]: failure
});

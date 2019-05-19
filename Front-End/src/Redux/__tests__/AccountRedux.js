import Actions, { reducer, INITIAL_STATE } from '../AccountRedux';

test('REDUX => ACTION => ACCOUNT_UPDATE', () => {
  const state = reducer(INITIAL_STATE, Actions.accountUpdate());
  expect(state.loading).toBe(true);
});

test('REDUX => ACTION => ACCOUNT_GET', () => {
  const state = reducer(INITIAL_STATE, Actions.accountGet());
  expect(state.loading).toBe(true);
});

test('REDUX => ACTION => ACCOUNT_CHANGE_PASSWORD', () => {
  const state = reducer(INITIAL_STATE, Actions.accountChangePassword());
  expect(state.loading).toBe(true);
});

test('REDUX => ACTION => ACCOUNT_PUSH', () => {
  const state = reducer(INITIAL_STATE, Actions.accountPush());
  expect(state.data).toBe(true);
});

test('REDUX => ACTION => ACCOUNT_SUCCESS', () => {
  const state = reducer(INITIAL_STATE, Actions.accountSuccess());
  expect(state.loading).toBe(true);
});

test('REDUX => ACTION => ACCOUNT_ERROR', () => {
  const state = reducer(INITIAL_STATE, Actions.accountFailure());
  expect(state.loading).toBe(true);
});

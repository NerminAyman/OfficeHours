import { put, call } from 'redux-saga/effects';
import AuthActions from '../Redux/AuthRedux';
import Constants from '../Constants';

export function * loginAuth(api, { data }) {
  try {
    // Call login
    const res = yield call(api.login, data);
    // Save to storage
    yield localStorage.setItem(Constants.storageKeys.token, res.data.id);
    yield localStorage.setItem(Constants.storageKeys.userId, res.data.userId);
    // Fire Success
    yield put(AuthActions.loginSuccess(res.data.id));
  } catch (error) {
    yield put(AuthActions.loginFailure());
  }
}

export function * checkAuth() {
  const token = yield localStorage.getItem(Constants.storageKeys.token);
  const userId = yield localStorage.getItem(Constants.storageKeys.userId);

  if (token && userId) {
    yield put(AuthActions.loginSuccess(token, userId));
  } else {
    yield put(AuthActions.loginFailure('NOT_AUTHORISED'));
  }
}

export function * logoutAuth() {
  yield localStorage.removeItem(Constants.storageKeys.token);
  yield localStorage.removeItem(Constants.storageKeys.userId);
}

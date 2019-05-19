import { put, call } from 'redux-saga/effects';
import AccountActions from '../Redux/AccountRedux';
import NotificationActions from '../Redux/NotificationRedux';
import Constants from '../Constants';

export function * getAccount(api) {
  const userId = localStorage.getItem(Constants.storageKeys.userId);
  const res = yield call(api.getAccount, userId);

  if (res.ok) {
    yield put(AccountActions.accountPush(res.data));
    yield put(AccountActions.accountSuccess());
  } else {
    yield put(AccountActions.accountFailure());
  }
}

export function * updateAccount(api, { data }) {
  try {
    const userId = localStorage.getItem(Constants.storageKeys.userId);
    const res = yield call(api.updateAccount, userId, data);
    yield put(AccountActions.accountPush(res.data));
    yield put(AccountActions.accountSuccess());
    yield put(NotificationActions.notificationNotify('ok', 'Saved Successfully.'));
  } catch (error) {
    yield put(AccountActions.accountFailure());
  }
}

export function * changePasswordAccount(api, { data }) {
  try {
    yield call(api.changePasswordAccount, data);
    yield put(AccountActions.accountSuccess());
    yield put(NotificationActions.notificationNotify('ok', 'Password Changed Successfully !'));
  } catch (error) {
    yield put(AccountActions.accountFailure());
  }
}

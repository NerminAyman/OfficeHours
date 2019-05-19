import { put, call } from 'redux-saga/effects';
import TagActions from '../Redux/TagRedux';
import NotificationActions from '../Redux/NotificationRedux';


export function * getTags(api) {
  const res = yield call(api.getTags);

  if (res.ok) {
    yield put(TagActions.tagsPush(res.data));
    yield put(TagActions.tagSuccess());
  } else {
    yield put(TagActions.tagFailure());
  }
}


export function * createTag(api, { data }) {
  try {
    yield call(api.createTag, data);
    yield put(TagActions.tagSuccess());
    yield put(NotificationActions.notificationNotify('ok', 'Tag Created'));
  } catch (error) {
    yield put(TagActions.tabFailure());
  }
}


export function * sendCard(api, data) {
  try {
    yield call(api.sendCard, data);
    yield put(TagActions.tagSuccess());
    yield put(NotificationActions.notificationNotify('ok', 'Tag Created'));
  } catch (error) {
    yield put(TagActions.tabFailure());
  }
}

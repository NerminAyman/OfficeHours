import { put, call } from 'redux-saga/effects';
import RegisterAction from '../Redux/RegisterRedux';

export function * RegisterRequest(api, { data }) {
  try {
    const res = yield call(api.Register, data);
    yield put(RegisterAction.addSuccess(res.data.id));
  } catch (error) {
    yield put(RegisterAction.addFailure());
  }
}

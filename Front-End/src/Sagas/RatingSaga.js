import { put, call } from 'redux-saga/effects';
import RateAction from '../Redux/RatingRedux';

export function * RatingRequest(api, { data }) {
  try {
    const res = yield call(api.Rate, data);
    yield put(RateAction.addSuccess(res.data.id));
  } catch (error) {
    yield put(RateAction.addFailure());
  }
}

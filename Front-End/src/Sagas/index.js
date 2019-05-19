import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { AuthTypes } from '../Redux/AuthRedux';
import { AccountTypes } from '../Redux/AccountRedux';
import { RegisterTypes } from '../Redux/RegisterRedux';
import { RateTypes } from '../Redux/RatingRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { loginAuth, checkAuth, logoutAuth } from './AuthSagas';
import { RegisterRequest } from './RegisterSaga';
import { RatingRequest } from './RatingSaga';

import { updateAccount, getAccount, changePasswordAccount } from './AccountSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // Auth
    takeLatest(AuthTypes.LOGIN, loginAuth, api),
    takeLatest(AuthTypes.CHECK, checkAuth),
    takeLatest(AuthTypes.LOGOUT, logoutAuth),
    // Register

    takeLatest(RegisterTypes.REGISTER, RegisterRequest, api),

    // Account
    takeLatest(AccountTypes.ACCOUNT_GET, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE, updateAccount, api),
    takeLatest(AccountTypes.ACCOUNT_CHANGE_PASSWORD, changePasswordAccount, api),

    // Rating
    takeLatest(RateTypes.RATE, RatingRequest, api)

  ]);
}

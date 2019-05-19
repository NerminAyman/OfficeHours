import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    router: routerReducer,
    auth: require('./AuthRedux').reducer,
    register: require('./RegisterRedux').reducer,
    account: require('./AccountRedux').reducer,
    blocker: require('./BlockerRedux').reducer,
    notification: require('./NotificationRedux').reducer,
    rate: require('./RatingRedux').reducer,
    loadingBar: loadingBarReducer
  });

  return configureStore(rootReducer, rootSaga);
};

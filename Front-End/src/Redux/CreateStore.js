import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);
  middleware.push(routerMiddleware(history));

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /* ------------- AutoRehydrate Enhancer ------------- */

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};

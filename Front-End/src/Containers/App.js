import React, { Component } from 'react';

import { Provider } from 'react-redux';

import AppNavigation from '../Navigation';
import createStore from '../Redux';

// Main Styles
import '../Styles/index.scss';

// create our store
const store = createStore();

/**
 * Provides an entry point into our application.
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default App;

export {
  store
};

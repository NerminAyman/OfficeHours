import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { store } from '../Containers/App.js';

import Constants from '../Constants';

export default class ResponseMiddleware {
  constructor(api) {
    this.api = api;
    this.error = null;
    this.serverError = null;
  }

  handleRequest() {
    this.api.addRequestTransform(request => {
      const token = localStorage.getItem(Constants.storageKeys.token);
      // Clear Any Notifications
      store.dispatch({ type: 'NOTIFICATION_CLEAR' });

      // Show Loading
      store.dispatch(showLoading());

      // Add token if found
      if (token) {
        if (request.params) {
          request.params.access_token = token;
        } else {
          request.params = {
            access_token: token
          };
        }
      }

      // check method
      switch (request.method) {
      case 'post':
      case 'put':
      case 'patch':
        store.dispatch({ type: 'BLOCKER_RUN' });
        break;
      default:
        store.dispatch({ type: 'BLOCKER_STOP' });
      }
    });
  }

  handleResponse() {
    this.api.addResponseTransform(response => {
      // Stop Loading
      store.dispatch(hideLoading());
      store.dispatch({ type: 'BLOCKER_STOP' });

      // Handle Errors
      if (response.data && response.data.error && response.data.error.message) {
        this.serverError = response.data.error.message;
      } else {
        this.serverError = null;
      }

      switch (response.problem) {
      case 'CLIENT_ERROR':
        if (response.status === 400) {
          this.error = this.serverError || 'Bad Request, Please try again.';
        } else if (response.status === 401) {
          this.error = this.serverError || 'Unauthorized, Please try again.';
          store.dispatch({ type: 'LOGOUT' });
        } else if (response.status === 403) {
          this.error = this.serverError || 'Forbidden, Please try again.';
        } else if (response.status === 404) {
          this.error = this.serverError || 'Not Found, Please try again.';
        }
        break;
      case 'SERVER_ERROR':
        if (response.status === 500) {
          this.error = this.serverError || 'Internal server error, Please try again.';
        } else if (response.status === 502) {
          this.error = this.serverError || 'Bad gateway, Please try again.';
        } else if (response.status === 503) {
          this.error = this.serverError || 'Service unavailable, Please try again.';
        }
        break;
      case 'TIMEOUT_ERROR':
        this.error = this.serverError || 'Server takes too long to respond, Please check your connection then try again.';
        break;
      case 'CONNECTION_ERROR':
      case 'NETWORK_ERROR':
      case 'CANCEL_ERROR':
        this.error = this.serverError || 'Internet down, Please check your connection then try again.';
        break;
      default:
        this.error = this.serverError || 'Somthig went wrong, Please try again later';
      }

      if (!response.ok) {
        store.dispatch({
          type: 'NOTIFICATION_NOTIFY',
          status: 'critical',
          message: this.error
        });
      }
    });
  }
}

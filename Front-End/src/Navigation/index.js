// Node Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import LoadingBar from 'react-redux-loading-bar';

// Grommet
import App from 'grommet/components/App';
import Notification from 'grommet/components/Notification';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';

// Routes
import AdminNavigation from './Admin';
import ExpertNavigation from './Expert';
import AccountNavigation from './Authenticated';
import NotAuthenticatedNavigation from './NotAuthenticated';
import AuthActions from '../Redux/AuthRedux';
import NotificationActions from '../Redux/NotificationRedux';
import AccountActions from '../Redux/AccountRedux';

// Redux
import { history } from '../Redux/CreateStore';

class AppNavigation extends Component {
  componentWillMount() {
    this.props.check();
    if (this.props.token) { this.props.getUser(); }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.notification.status === 'ok') {
      setTimeout(() => {
        this.props.clearNotification();
      }, 7000);
    }
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <App centered={false}>
          <LoadingBar
            className="loading-bar"
            updateTime={100}
            maxProgress={90}
            progressIncrease={5}
          />

          <If condition={ this.props.notification.active }>
            <Notification
              closer={
                <Button
                  icon={<CloseIcon colorIndex='neutral-2' />}
                  onClick={() => this.props.clearNotification()}
                />
              }
              status={this.props.notification.status}
              message={this.props.notification.message}
            />
          </If>

          <Choose>
            <When condition={ this.props.token }>
              <Choose>
                <When condition={ this.props.account && this.props.account.role === 'admin' }>
                  <AdminNavigation />
                </When>
                <Otherwise>
                  <Choose>
                    <When condition={ this.props.account && this.props.account.role === 'expert' }>
                      <ExpertNavigation />
                    </When>
                    <Otherwise>
                      <AccountNavigation />
                    </Otherwise>
                  </Choose>
                </Otherwise>
              </Choose>
            </When>
            <Otherwise>
              <NotAuthenticatedNavigation />
            </Otherwise>
          </Choose>
        </App>
      </ConnectedRouter>
    );
  }
}

AppNavigation.propTypes = {
  token: PropTypes.string,
  check: PropTypes.func,
  notification: PropTypes.object,
  clearNotification: PropTypes.func,
  getUser: PropTypes.func,
  account: PropTypes.object
};

const mapStateToProps = store => {
  return {
    token: store.auth.token,
    notification: store.notification,
    account: store.account.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    check: () => dispatch(AuthActions.check()),
    clearNotification: () => dispatch(NotificationActions.notificationClear()),
    getUser: () => dispatch(AccountActions.accountGet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);

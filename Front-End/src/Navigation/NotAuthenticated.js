import React, { Component } from 'react';

import { Route, Switch } from 'react-router';

import MainLayout from '../Containers/NotAuthenticated/Layouts/Main';
import Register from '../Containers/NotAuthenticated/Screens/Register';
import LoginContainer from '../Containers/NotAuthenticated/Screens/LoginContainer';
import TagAssignment from '../Containers/NotAuthenticated/Screens/TagAssignment';

class NotAuthenticatedNavigation extends Component {
  render() {
    return (
      <MainLayout>
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/TagAssignment" component={TagAssignment}/>
          <Route path="/" component={ LoginContainer }/>
        </Switch>
      </MainLayout>
    );
  }
}

export default NotAuthenticatedNavigation;

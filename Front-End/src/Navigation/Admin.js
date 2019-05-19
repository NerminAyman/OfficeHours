import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router';

import MainLayout from '../Containers/Authenticated/Layouts/AMain';

import AccountScreen from '../Containers/Authenticated/Screens/AAccount';
import AuthExpert from '../Containers/Authenticated/Screens/AuthExpert';
import Search from '../Containers/Authenticated/Screens/Search';
import viewCards from '../Containers/Authenticated/Screens/AAccount/viewCards/viewCards';
import mainRating from '../Containers/Authenticated/Screens/AAccount/AdminSec/viewsrate/main';
import mainComments from '../Containers/Authenticated/Screens/AAccount/AdminSec/Viewcomments/main';

class AAuthenticatedNavigation extends Component {
  render() {
    return (
      <MainLayout>
        <Switch>
          <Route exact path="/admin" component={AccountScreen}/>
          <Route exact path="/ExpertAuth" component={AuthExpert}/>
          <Route exact path="/Search" component={Search}/>
          <Route path="/viewCards" component={viewCards}/>
          <Route exact path="/ViewRate" component={mainRating}/>
          <Route exact path="/ViewComment" component={mainComments}/>
          <Redirect from="/" to="/admin" />
        </Switch>
      </MainLayout>
    );
  }
}

export default AAuthenticatedNavigation;

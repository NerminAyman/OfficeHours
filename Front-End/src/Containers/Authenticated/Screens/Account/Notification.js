import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountActions from '../../../../Redux/AccountRedux';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountID: '',
      type: '',
      questionID: '',
      Information: ''
    };
  }
  addMeetup(newMeetup) {
    axios.request({
      method: 'post',
      url: 'http://localhost:3001/api/Cards',
      data: newMeetup
    }).then(response => {
    }).catch(err => console.log(err));
  }

  handleSubmit(e) {
    const newMeetup = {
      accountID: '5ac320b7c7b904055426a264',
      Information: 'Meeting has been set',
      type: 'Notification',
      questionID: 'None'
    };
    this.addMeetup(newMeetup);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Meeting Timing Done</h1>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store.account.data,
    fetching: store.account.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: () => dispatch(AccountActions.accountGet())
  };
};
Notification.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

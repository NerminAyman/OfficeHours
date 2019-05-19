import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

import Constants from '../Constants';

class Meeting extends Component {
  constructor() {
    super();
    this.state = {
      meetings: [],
      hide: false
    };
    this.toggleButton = this.toggleButton.bind(this);
  }
  componentWillMount() {
    this.getMeetings();
  }
  getMeetings() {
    axios.get('http://localhost:3001/api/meetings').then(response => {
      this.setState({ meetings: response.data }, () => {
        console.log(this.state);
      }
      );
    });
  }
  toggleButton(value, i) {
    this.setState({ hide: value });
  }
  onReject(meeting, e) {
    const id = meeting.id;
    axios.delete(`http://localhost:3001/api/Meetings/${id}`).then(response => {
      console.log(this.state.id);
    });
    axios.request({
      method: 'post',
      url: 'http://localhost:3001/api/cards',
      data: {
        accountID: meeting.clientID,
        type: 'Notification',
        Information: `Your meeting with ${this.props.account.name} has been cancelled`
      }
    }).then(response => {
      console.log('Card sent');
    });
  }
  onAccept(meeting, i) {
    const id = meeting.id;
    axios.request({
      method: 'patch',
      url: `http://localhost:3001/api/meetings/${id}`,
      data: {
        status: 'Accepted'
      }
    }).then(response => {
      console.log('accepted');
    });
    axios.request({
      method: 'post',
      url: 'http://localhost:3001/api/cards',
      data: {
        accountID: meeting.clientID,
        type: 'Notification',
        Information: `Your meeting with ${this.props.account.name} has been confirmed`
      }
    }).then(response => {
      console.log('Card sent');
    });
  }
  render() {
    const userId = localStorage.getItem(Constants.storageKeys.userId);
    const meetingItems = this.state.meetings.map((meeting, i) => {
      return (
        <div key={i}>
          <If condition ={ userId === meeting.expertID }>
            <label className='collection-item' key={i}>
              <h4>Client Name :{meeting.clientName}</h4>
              <h4>Meeting Title :{meeting.meetingtitle}</h4>
              <h4>Date :{meeting.date}</h4>
              <h4>Status :{meeting.status}</h4>
              <div key={i}>
                <Button onClick = { this.onAccept.bind(this, meeting)} label='accept' href='#'/>
                <Button onClick = {this.onReject.bind(this, meeting)} label='reject' href='#'/>
              </div>
              <br />
              <br />
            </label>
          </If>
        </div>
      );
    });
    return (
      <div>
        <h1> Meetings </h1>
        <ul className="collection">{ meetingItems}</ul>
      </div>
    );
  }
}
Meeting.propTypes = {
  token: PropTypes.string,
  userId: PropTypes.string,
  account: PropTypes.object
};
const mapStateToProps = store => {
  return {
    token: store.auth.token,
    userId: store.auth.userId,
    account: store.account.data
  };
};

export default connect(mapStateToProps)(Meeting);

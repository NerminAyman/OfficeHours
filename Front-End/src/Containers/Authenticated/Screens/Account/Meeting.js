import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountActions from '../../../../Redux/AccountRedux';

class MeetingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: []
    };
  }

  componentWillMount() {
    this.getMeetings();
  }
  getMeetings() {
    axios.get('http://localhost:3001/api/Meetings')
      .then(response => {
        this.setState({ meetings: response.data }, () => {
          console.log(this.state);
        });
      });
  }

  render() {
    // const userId = localStorage.getItem(Constants.storageKeys.userId);
    const meetingItems = this.state.meetings.map((meeting, i) => {
      return (
        <div key={i}>
          <If condition ={ this.props.account.id === meeting.expertID }>
            <label className='collection-item' key={i}>
              <h4>Client Name :{meeting.clientName}</h4>
              <h4>Meeting Title :{meeting.meetingtitle}</h4>
              <Link to="/card/add">
                <button style={{ background: 'yellow', color: 'black' }}>Date Request 1 : {meeting.dateRequestOne}</button>
              </Link>
              <button style={{ background: 'yellow', color: 'black' }}>Date Request 2 : {meeting.dateRequestTwo}</button>
              <button style={{ background: 'yellow', color: 'black' }}>Date Request 3 : {meeting.dateRequestThree}</button>
              <h4>Date :{meeting.date}</h4>
              <h4>Status :{meeting.status}</h4>
              <br />
              <br />
            </label>
          </If>
        </div>
      );
    });
    return (
      <div>
        <p>
          { (
            <Link to="/">
              <button
                style={{ background: 'yellow', color: 'black' }}
              >
              Go to Profile
              </button>
            </Link>
          )}
        </p>
        <h1>Meetings</h1>
        <ul>
          {meetingItems}
        </ul>
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
MeetingScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(MeetingScreen);

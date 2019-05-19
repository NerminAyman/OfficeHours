import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import AccountActions from '../../../../../../Redux/AccountRedux';

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

  addmeetup(meeting, date) {
    axios.post('http://localhost:3001/api/Meetings', {
      meetingtitle: meeting.meetingtitle,
      meetingfinaltiming: date,
      expertID: meeting.expertID,
      clientID: meeting.clientID,
      date: meeting.date,
      status: 'DateChosen',
      clientName: meeting.clientName,
      dateRequestOne: meeting.dateRequestOne,
      dateRequestTwo: meeting.dateRequestTwo,
      dateRequestThree: meeting.dateRequestThree
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });

    axios.delete(`http://localhost:3001/api/Meetings/${meeting.id}`)
      .then(res => {
        console.log(res);
        console.log('it works');
      })
      .catch(error => {
        console.log(error);
      });

    axios.post('http://localhost:3001/api/Cards', {
      accountID: meeting.expertID,
      Information: `The client ${meeting.clientName} has chosen this date : ${date}`,
      type: 'Notification'
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
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
          <If condition ={ this.props.account.id === meeting.clientID && meeting.status === 'pending'}>
            <label className='collection-item' key={i}>
              <h4>Client Name :{meeting.clientName}</h4>
              <h4>Meeting Title :{meeting.meetingtitle}</h4>

              <button style={{ background: 'yellow', color: 'black' }} onClick={this.addmeetup.bind(this, meeting, meeting.dateRequestOne)}> Date Request 1 : {meeting.dateRequestOne}</button>

              <button style={{ background: 'yellow', color: 'black' }} onClick={this.addmeetup.bind(this, meeting, meeting.dateRequestTwo)}> Date Request 2 : {meeting.dateRequestTwo}</button>


              <button style={{ background: 'yellow', color: 'black' }} onClick={this.addmeetup.bind(this, meeting, meeting.dateRequestThree)}> Date Request 3 : {meeting.dateRequestThree}</button>

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


MeetingScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object
};
export default connect(mapStateToProps)(MeetingScreen);

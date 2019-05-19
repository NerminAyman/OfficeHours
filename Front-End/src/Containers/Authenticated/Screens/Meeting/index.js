import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import constants from '../../../../Constants';


class AccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      meeting: []
    };
  }
  handleDeleteProject(id) {
    const index = this.state.meeting.findIndex(x => x.id === id);
    this.state.meeting.splice(index, 1);
    this.setState({ meeting: this.state.meeting });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mediaList !== this.props.mediaList) {
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getMeetings();
  }
  getMeetings() {
    const userId = localStorage.getItem(constants.storageKeys.userId);

    fetch(`http://localhost:3001/api/Meetings?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => response.json())
      .then(responseJson => {
        responseJson.map(item => {
          console.log(item.clientID);
          axios.get(`http://localhost:3001/api/Accounts/${item.clientID}?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
            .then(res => {
              if (item.expertID === userId) {
                const today = new Date();
                const timedateofMeeting = new Date(item.date);
                if (today <= timedateofMeeting) {
                  const tdate = new Date(item.date);
                  console.log(tdate.toString());
                  const newArray = this.state.meeting.slice();
                  newArray.push({
                    id: item.id,
                    clientID: item.clientID,
                    clientName: res.data.name,
                    expertID: item.expertID,
                    date: tdate.toDateString(),
                    time: tdate.toTimeString()
                  });
                  this.setState({ meeting: newArray });
                  console.log(res.data.name);
                  console.log('it works');
                }
              }
            })

            .catch(error => {
              console.log(error);
            });
          return true;
        });
      })
      .catch(error => {
        console.error(error);
      });

    this.render();
  }

  render() {
    return (

      <div>
        <Search expo={this.state.meeting} onDel={this.handleDeleteProject.bind(this)} />
      </div>
    );
  }
}


export default (AccountScreen);

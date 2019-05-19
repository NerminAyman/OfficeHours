import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../Constants';

class Search extends Component {
  DeleteCard(id, clientID) {
    if (confirm('Are you sure?')) {
      axios.delete(`http://localhost:3001/api/Meetings/${id}?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
        .then(res => {
          console.log(res);
          console.log('it works');
        })
        .catch(error => {
          console.log(error);
        });

      axios.post(`http://localhost:3001/api/Cards?access_token=${localStorage.getItem(constants.storageKeys.token)}`, {
        accountID: clientID,
        type: 'canceled the meeting'
      })
        .then(res => {
          console.log(res);
          console.log('it works');
        })
        .catch(error => {
          console.log(error);
        });
      this.props.onDel(id);
    }
  }


  componentDidMount() {
    this.DeleteAcc();
    this.render();
  }


  // onClick={this.AcceptProject.bind(this, ayhaga.username)}
  render() {
    let itm;
    let i = 0;


    if (this.props.expo) {
      itm = this.props.expo.map(
        meeting =>
          <div key={i++}>

            <table>
              <tbody>
                <tr>clientName: {meeting.clientName}</tr>
                <tr>date: {meeting.date}</tr>
                <tr>time: {meeting.time}</tr>
              </tbody>
            </table>

            <button type="button"
              onClick={this.DeleteCard.bind(this, meeting.id, meeting.clientID)}>
              Cancel Meeting
            </button>

            <p></p>
          </div>


      );
    }


    return (
      <div>{itm}</div>
    );
  }
}


export default Search;

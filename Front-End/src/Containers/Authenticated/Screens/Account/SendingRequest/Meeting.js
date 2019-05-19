import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import constants from '../../../../../Constants';
import AccountActions from '../../../../../Redux/AccountRedux';


import './Styles.scss';

class requestMeeting extends Component {
  constructor() {
    super();
    this.state = {
      experts: []
    };
  }

  createRequest(newRequest) {
    axios.request({
      method: 'post',
      url: `http://localhost:3001/api/Questions?access_token=${localStorage.getItem(constants.storageKeys.token)}`,
      data: newRequest
    }).then(response => {
      this.props.history.push('/');
    }).catch(error => console.log(error));
  }

  handleSubmit(e) {
    let firstID;
    let secondID;
    let thirdID;
    axios.get(`http://localhost:3001/api/Accounts?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => {
        this.setState({ experts: response.data }, () => {
          let i;
          for (i = this.state.experts.length - 1; i >= 0; i -= 1) {
            if ((this.state.experts[i].role === 'client' || this.state.experts[i].role === 'admin')) {
              this.state.experts.splice(i, 1);
            }
          }
          let j;
          for (j = this.state.experts.length - 1; j >= 0; j -= 1) {
            if (this.state.experts[j].email !== this.refs.expertID.value
                && this.state.experts[j].email !== this.refs.expertID2.value
                && this.state.experts[j].email !== this.refs.expertID3.value) {
              this.state.experts.splice(j, 1);
            } else if (this.state.experts[j].email === this.refs.expertID.value) {
              firstID = this.state.experts[j].id;
            } else if (this.state.experts[j].email === this.refs.expertID2.value) {
              secondID = this.state.experts[j].id;
            } else {
              thirdID = this.state.experts[j].id;
            }
          }
          if (this.refs.description.value === '' || this.refs.expertID.value === ''
          || this.refs.expertID2.value === '' || this.refs.expertID3.value === '') {
            alert('Please Enter Missing Fields');
          } else if (this.state.experts.length < 3) {
            alert('You have entered wrong expert name, please make sure of the email of the expert');
          } else {
            const newRequest = {
              description: this.refs.description.value,
              requireMeeting: 'true',
              expertID: firstID,
              expertID2: secondID,
              expertID3: thirdID,
              senderID: this.props.account.id
            };

            this.createRequest(newRequest);
            alert('Request sent successfully');
          }
        });
      });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className= "App">
          <h3>
            <strong>Please insert the three experts acroding to your proiority </strong>
          </h3>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>First Expert : </label>
            <input type="text" ref="expertID" />
          </div>
          <br/>
          <div>
            <label>Second Expert : </label>
            <input type="text" ref="expertID2" />
          </div>
          <br/>
          <div>
            <label>Third Expert : </label>
            <input type="text" ref="expertID3" />
          </div>

          <br/>
          <div>
            <label>Questions : </label><br />
            <input type="text" ref="description" />
          </div>
          <br/>
          <input type="submit" value="Send the Request" />
        </form>
      </div>
    );
  }
}

requestMeeting.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object
};

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


export default connect(mapStateToProps, mapDispatchToProps)(requestMeeting);

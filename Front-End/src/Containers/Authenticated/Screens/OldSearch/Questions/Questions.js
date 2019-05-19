import React, { Component } from 'react';
import axios from 'axios';
// import '../Styles.scss';
// import PropTypes from 'prop-types';

class Questions extends Component {
  addQues(newQues) {
    console.log(newQues);
    axios.request({
      method: 'Post',
      url: 'http://localhost:3001/api/Questions',
      data: newQues
    }).then(response => {
    }).catch(error => console.log(error));
  }
  constructor() {
    super();
    // this.onChange = this.onChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onExpIdChange = this.onExpIdChange.bind(this);
    this.onIsmeetingChange = this.onIsmeetingChange.bind(this);
    this.state = {
      description: '',
      requireMeeting: false,
      expID: ''
    };
  }
  onExpIdChange(e) {
    this.setState({
      expID: e.target.value
    });
  }
  onDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }
  onIsmeetingChange(e) {
    this.setState({
      requireMeeting: true
      // document.getElementById("checkbox").checked = true;
    });
  }
  onSubmit(e) {
    const newQues = {
      description: this.state.description,
      requireMeeting: this.state.requireMeeting,
      expID: this.state.expID
    };
    this.addQues(newQues);
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <br/>
        <h1> DO NOT HESISTATE TO ASK OUR EXPERTS </h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <p><label htmlFor="description"> Description </label></p>
            <textarea rows="10" cols="100" name="description" onChange={this.onDescriptionChange} />
          </div>
          <div className="input-field">
            <p> <label htmlFor="name"> expID </label> </p>
            <input type="text" name="expID" onChange={this.onExpIdChange} />
          </div>
          <p> </p>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="requireMeeting"
                onClick={this.onIsmeetingChange} />Meeting
            </label>
          </div>
          <input type ="submit" value="ASK" className="btn" />
        </form>
      </div>
    );
  }
}
export default Questions;

import React, { Component } from 'react';
import constants from '../../../../Constants';
import ExpertItem from './expertItem';

class QuestionToExpert extends Component {
  constructor() {
    super();
    this.state = {
      experts: []
    };
  }

  componentDidMount() {
    this.getExperts();
  }

  getExperts() {
    const keyword = this.refs.searchBox.value;
    const criteria = this.refs.category.value;
    fetch(`http://localhost:3001/api/Accounts?filter={"where":{"role":"expert","${criteria}":{"like":"${keyword}"}}}&access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(res => res.json())
      .then(data => this.setState({ experts: data }));
  }

  render() {
    return (
      <div>
        <form >
          <input type="text" required ref="searchBox"
            placeholder="Enter Some Keywords" onChange={this.getExperts.bind(this)} />
          <select ref="category">
            <option value="name">Name</option>
            <option value="field">Field</option>
            <option value="email">Email</option>
          </select>
        </form>
        <div>
          <ExpertItem experts = {this.state.experts} />
        </div>
      </div>);
  }
}

export default QuestionToExpert;

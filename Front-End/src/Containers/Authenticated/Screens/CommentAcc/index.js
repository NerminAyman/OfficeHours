import React, { Component } from 'react';
import axios from 'axios';

class AccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentWillMount() {
    this.getComments();
  }
  getComments() {
    axios.get('http://localhost:3001/api/Comments')
      .then(response => {
        this.setState({ comments: response.data }, () => {
          console.log(this.state);
        });
      });
  }

  render() {
    const commentItems = this.state.comments.map((comment, i) => {
      return (
        <li key={i}>{comment.message}</li>
      );
    });
    return (
      <div>
        <h1>Comments</h1>
        <ul>
          {commentItems}
        </ul>
      </div>
    );
  }
}

export default AccountScreen;

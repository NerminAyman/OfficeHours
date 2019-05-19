import React, { Component } from 'react';
import axios from 'axios';

class AccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      ratings: []
    };
  }

  componentWillMount() {
    this.getRatings();
  }
  getRatings() {
    axios.get('http://localhost:3001/api/Ratings')
      .then(response => {
        this.setState({ ratings: response.data }, () => {
          console.log(this.state);
        });
      });
  }

  render() {
    const ratingItems = this.state.ratings.map((rating, i) => {
      return (
        <li key={i}>{rating.rate}</li>
      );
    });
    return (
      <div>
        <h1>Ratings</h1>
        <ul>
          {ratingItems}
        </ul>
      </div>
    );
  }
}

export default AccountScreen;

/* eslint-disable */

import React, { Component } from 'react';
import ViewExpert from './Search';

class SearchExpert extends Component {
  constructor() {
    super();
    this.state = {
      experts: []
    };
  }

  componentDidMount() {
    const experts = [];
    fetch('http://localhost:3001/api/Accounts')
      .then(response => response.json())
      .then(responseJson => {
        responseJson.map(item => {
          console.log(item.id);
          experts.push(
            {
              description: item.description,
              field: item.field,
              role: item.role,
              name: item.name,
              email: item.email,
              id: item.id
            });
          return false;
        });
        this.setState({ experts });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <ViewExpert experts={this.state.experts} />
      </div>
    );
  }
}

export default SearchExpert;

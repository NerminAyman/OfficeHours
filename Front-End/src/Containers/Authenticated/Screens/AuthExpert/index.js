import React, { Component } from 'react';
import ViewExpert from './ViewClientExpert';
import constants from '../../../../Constants';

class AuthExpert extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }


  handleDelete(id) {
    const index = this.state.cards.findIndex(x => x.id === id);
    this.state.cards.splice(index, 1);
    this.setState({ cards: this.state.cards });
  }


  componentDidMount() {
    fetch(`http://localhost:3001/api/Cards?filter={"where":{"accountID":"admin","type":"ExpertApproval"}}&access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ cards: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <ViewExpert cards={this.state.cards} onDel={this.handleDelete.bind(this)} />
      </div>
    );
  }
}

export default AuthExpert;

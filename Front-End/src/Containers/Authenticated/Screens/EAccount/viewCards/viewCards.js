/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountActions from '../../../../../Redux/AccountRedux';
import constants from '../../../../../Constants';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import { smallSize } from 'grommet/utils/Responsive';

class viewCards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      description: ''
    };

  }



  componentWillMount() {+
    this.getCards();
  }
  getCards() {
    axios.get(`http://localhost:3001/api/cards?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => {
        this.setState({ cards: response.data }, () => {
          console.log(this.state);
        });
      });
  }
  render() {
    const { id: accID } = this.props.account;
    const card = this.state.cards.filter(({ accountID }) => accountID === accID);
    return (
      <div>
        <h1>Your  Cards</h1>
        <ul>
          { card.map( c => (
            <div style={{ border: '2px solid' , 'border-radius': '5px' }} >
            <Card  label={'card name'} heading={c.name}  description ={c.description}>
            </Card>
            </div>
          ))}
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
const mapDispatchToProps = dispatch => {
  return {
    get: () => dispatch(AccountActions.accountGet())
  };
};
viewCards.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object,
  card: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(viewCards);


import React, { Component } from 'react';
import ViewRating from './Review';
import constants from '../../../../../../Constants';

class mainRating extends Component {
  constructor() {
    super();
    this.state = {
      All_rate_Account: [
        {
          userID: '',
          rating: '',
          role: '',
          name: '',
          description: '',
          field: '',
          email: ''
        }
      ],

      isLoading: false
    };
  }


  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(`http://localhost:3001/api/Ratings?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => response.json())
      .then(ratedata => {
        ratedata.map(ratingElem => {
          // console.log(item);
          if (ratingElem.rate < 2) {
            fetch(`http://localhost:3001/api/Accounts?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
              .then(response => response.json())
              .then(Accountdata => {
                Accountdata.map(accountElem => {
                  // console.log(item);
                  if (accountElem.id === ratingElem.userID) {
                    const rateAccElem = this.state.All_rate_Account.slice();
                    rateAccElem.push({
                      userID: ratingElem.userID,
                      rating: ratingElem.rate,
                      description: accountElem.description,
                      field: accountElem.field,
                      role: accountElem.role,
                      name: accountElem.name,
                      email: accountElem.email

                    });
                    this.setState({ All_rate_Account: rateAccElem, isLoading: false });
                    // this.setState({All_rate_Account:newArray,isLoading:false})
                  }
                  return true;
                });
              })
              .catch(error => {
                console.error(`error is ${error}`);
              });
          }
          return true;
        });
      })
      .catch(error => {
        console.error(`error is ${error}`);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    // console.log(this.state.All_rate_Account);
    return (
      <div>
        <ViewRating All_Rating={this.state.All_rate_Account} />
      </div>
    );
  }
}

export default mainRating;

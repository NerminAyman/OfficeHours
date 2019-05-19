import React, { Component } from 'react';
import ViewComments from './ViewComments';
import constants from '../../../../../../Constants';

class mainComments extends Component {
  constructor() {
    super();
    this.state = {
      All_comment_Account: [
        {
          userID: '',
          Report: '',
          message: '',
          role: '',
          name: '',
          description: '',
          field: '',
          email: ''
        }
      ]
      // isLoading: false
    };
  }


  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`http://localhost:3001/api/Comments?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => response.json())
      .then(commentdata => {
        commentdata.map(commentElem => {
          // console.log("inside");
          if (commentElem.Report === 1) {
            console.log(commentElem.expertID);
            fetch(`http://localhost:3001/api/Accounts?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
              .then(response => response.json())
              .then(Accountdata => {
                Accountdata.map(accElem => {
                  if (accElem.id === commentElem.UserID) {
                    const commentAccElem = this.state.All_comment_Account.slice();
                    commentAccElem.push({
                      userID: commentElem.UserID,
                      Report: commentElem.Report,
                      message: commentElem.message,
                      description: accElem.description,
                      field: accElem.field,
                      role: accElem.role,
                      name: accElem.name,
                      email: accElem.email

                    });
                    // this.setState({All_comment_Account:commentAccElem});
                    this.setState({ All_comment_Account: commentAccElem, isLoading: false });
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
      return (
        <div>
         isloading ----
        </div>);
    }

    console.log(this.state.All_comment_Account);
    return (
      <div>

        <ViewComments All_comment={this.state.All_comment_Account} />
      </div>
    );
  }
}


export default mainComments;

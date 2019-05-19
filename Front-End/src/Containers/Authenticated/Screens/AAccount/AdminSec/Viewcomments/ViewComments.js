import React, { Component } from 'react';
import uuid from 'uuid';
import constants from '../../../../../../Constants';

class ViewComments extends Component {
  constructor() {
    super();
    this.state = {
      Message: '',
      Id: '',
      on: false,
      name: ''
    };
  }
  onClose(event) {
    this.setState({ on: false });
  }
  onOpen(event, id, name) {
    this.setState({ Id: id });

    this.setState({ on: true });
    this.setState({ name });
  }

  onBlur(event) {
    this.setState({ typed: event.target.value });
  }
  sendMessage(event) {
    if (this.state.Message === '') {
      alert('Can\'t send empty messages');
    } else {
      fetch(`http://localhost:3001/api/Cards?access_token=${localStorage.getItem(constants.storageKeys.token)}`
        , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accountID: this.state.Id,
            type: 'admin',
            Message: this.state.Message
          })
        });
      this.setState({
        Message: ''
      });
      alert('Message sent!');
    }
  }
  updateInput(evt) {
    this.setState({
      Message: evt.target.value
    });
  }


  render() {
    let filterComments;
    const filterComment = this.props.All_comment.filter(
      eachComment => {
        return (eachComment && eachComment.name.length > 0);
      }
    );

    if (this.props.All_comment) {
      filterComments = filterComment.map(
        eachFiltercomment =>
          <div key={uuid.v4()}>
            <div>name: {eachFiltercomment.name}</div>
            <div>role: {eachFiltercomment.role}</div>
            <div>description: {eachFiltercomment.description}</div>
            <div>field:{eachFiltercomment.field}</div>
            <div>email: {eachFiltercomment.email}</div>
            <div>message: {eachFiltercomment.message}</div>

            <button type="button"
              onClick={e => this.onOpen(e, eachFiltercomment.userID, eachFiltercomment.name)}
              onBlur={this.onBlur.bind(this)}>Send Message</button>
            <p></p>
          </div>


      );
    }


    return (
      <div>

        {this.state.on ? (
          <div>
            <button type="button" onClick={e => this.onClose(e)}> X </button>
            <form onSubmit={this.sendMessage}>
              Message:
              <input value={this.state.Message} onChange={e => this.updateInput(e)}/><br />
              <button type="button"
                onClick={e => this.sendMessage(e)}
                onBlur={this.onBlur.bind(this)}>Send to {this.state.name}</button>
            </form>
          </div>
        ) : (
          <div></div>
        )}

        {filterComments}
      </div>
    );
  }
}

export default ViewComments;

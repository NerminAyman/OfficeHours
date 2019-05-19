import React, { Component } from 'react';
import constants from '../../../../../../Constants';

class ViewRating extends Component {
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
      this.setState({
        Id: ''
      });
      alert('Message sent!');
      console.log(this.state.Id);
    }
  }
  updateInput(evt) {
    this.setState({
      Message: evt.target.value
    });
  }


  render() {
    let ratingFilter;
    const filterRating = this.props.All_Rating.filter(
      eachRating => {
        return (eachRating && eachRating.name.length > 0);
      }
    );

    if (this.props.All_Rating) {
      ratingFilter = filterRating.map(
        eachFilterRate =>
          <div key={eachFilterRate.id}>

            <div>name: {eachFilterRate.name}</div>
            <div>role: {eachFilterRate.role}</div>
            <div>description: {eachFilterRate.description}</div>
            <div>field:{eachFilterRate.field}</div>
            <div>email: {eachFilterRate.email}</div>
            <div>rate: {eachFilterRate.rating}</div>
            <button type="button"
              onClick={e => this.onOpen(e, eachFilterRate.userID, eachFilterRate.name)}
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
        {ratingFilter}
      </div>
    );
  }
}

export default ViewRating;

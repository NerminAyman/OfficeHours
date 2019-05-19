import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CommentScreen extends Component {
  constructor(props) {
    super(props);
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
          // console.log(this.state);
        });
      });
  }

  render() {
    const commentItems = this.state.comments.map((comment, i) => {
      return (
        <div key={i}>
          <If condition ={ this.props.account.id === comment.UserID && comment.Rating>0 }>
            <label className='collection-item' key={i}>
              <h4>Message :{comment.message}</h4>
              <h4>Rating :{comment.Rating}</h4>
              <br />
              <br />
            </label>
          </If>
          <If condition ={ this.props.account.id === comment.UserID && comment.Rating===0}>
            <label className='collection-item' key={i}>
             <h4>Message :{comment.message}</h4>
             <h4>Rating :{'No Rating was Given'}</h4>
             <br />
             <br />
            </label>
          </If>
        </div>
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
const mapStateToProps = store => {
  return {
    account: store.account.data,
    fetching: store.account.fetching
  };
};

CommentScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object,
  comment: PropTypes.object
};
export default connect(mapStateToProps)(CommentScreen);

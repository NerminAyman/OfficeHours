import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountActions from '../../../../Redux/AccountRedux';

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
          //console.log(this.state);
        });
      });
  }

  render() {
    const commentItems = this.state.comments.map((comment, i) => {
      return (
        <div key={i}>
          <If condition ={ this.props.account.id === comment.expertID }>
            <label className='collection-item' key={i}>
              <h4>Message :{comment.message}</h4>
              <h4>Rating :{comment.Rating}</h4>
              <br />
              <br />
            </label>
          </If>
        </div>
      );
    });
    return (
      <div>
        <p>
          { (
            <Link to="/">
              <button
                style={{ background: 'yellow', color: 'black' }}
              >
              Go to Profile
              </button>
            </Link>
          )}
        </p>
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

const mapDispatchToProps = dispatch => {
  return {
    get: () => dispatch(AccountActions.accountGet())
  };
};
CommentScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object,
  comment: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);

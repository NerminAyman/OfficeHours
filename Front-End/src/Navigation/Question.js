import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import AccountActions from '../../../../Redux/AccountRedux';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentWillMount() {
    this.getQuestion();
  }
  getQuestion() {
    axios.get('http://localhost:3001/api/Questions')
      .then(response => {
        this.setState({ questions: response.data }, () => {
          console.log(this.state);
        });
      });
  }

  render() {
    const questionItems = this.state.questions.map((question, i) => {
      return (
        <div key={i}>
          <If condition ={ this.props.account.id === question.senderID }>
            <label className='collection-item' key={i}>
              <h4>Question :{question.description}</h4>
              <br />
              <br />
            </label>
          </If>
        </div>
      );
    });
    return (
      <div>
        <h1>Questions</h1>
        <ul>
          {questionItems}
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

QuestionScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object,
  comment: PropTypes.object
};
export default connect(mapStateToProps)(QuestionScreen);

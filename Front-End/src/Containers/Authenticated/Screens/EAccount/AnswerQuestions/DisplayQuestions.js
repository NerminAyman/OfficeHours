import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountActions from '../../../../../Redux/AccountRedux';
import constants from '../../../../../Constants';


class DisplayQuestions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      description: ''
    };
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }
  addAnswer(question, description) {
    axios.post(`http://localhost:3001/api/Answers?access_token=${localStorage.getItem(constants.storageKeys.token)}`, {
      answer: description,
      question: question.description,
      clientID: question.createdBy
    })
      .then(response => {
        this.deleteQuestion(question.id);
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteQuestion(id) {
    axios.delete(`http://localhost:3001/api/Questions/${id}?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(res => {
        for (let i = 0; i < this.state.questions.length; i += 1) {
          if (this.state.questions[i].id === id) {
            this.state.questions.splice(i, 1);
            break;
          }
        }
        this.forceUpdate();
      })
      .catch(error => {
        console.log(error);
      });
  }
  onDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }
  componentWillMount() {
    this.getQuestions();
  }
  getQuestions() {
    axios.get(`http://localhost:3001/api/questions?filter={"where":{"expertID":"${this.props.account.id}"}}&access_token=${localStorage.getItem(constants.storageKeys.token)}`)
      .then(response => {
        this.setState({ questions: response.data }, () => {
        });
      });
  }
  render() {
    return (
      <div>
        <h1>Asked to You</h1>
        <ul>
          { this.state.questions.map(question => (
            <li key={ question.id }>
              {question.description}
              <p></p>
              <div className="input-field">
                <p><label htmlFor="description"> Answer Here </label></p>
                <textarea rows="10" cols="100"
                  name="description" onChange={this.onDescriptionChange} />
              </div>
              <p></p>
              <button style={{ background: 'blue', color: 'yellow' }}
                onClick=
                  {this.addAnswer.bind(this, question, this.state.description)}>Accept</button>
              <button style={{ background: 'blue', color: 'yellow' }}
                onClick= {this.deleteQuestion.bind(this, question.id)}>Reject</button>
              <p></p>
            </li>
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
DisplayQuestions.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object,
  question: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayQuestions);

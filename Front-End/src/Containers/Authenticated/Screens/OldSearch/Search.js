/* eslint-disable */
import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';
import { Link } from 'react-router-dom';
import AccordionItem from '../../Components/Accordion';
// import Questions from './Questions/Questions';

setInterval(() => { window.location = 'http://localhost:3000/account'; }, 60000);
class ViewExpert extends Component {
  constructor() {
    super();
    this.state = {
      searchBox: '',
      category: '',
      exp: '',
      hide: false
    };
    this.hideButton = this.hideButton.bind(this);
  }

  hideButton(value) {
    this.setState(prevState => {
      prevState = {
        ...prevState,
        hide: true,
        exp: value
      };
      return prevState;
    });
  }

  setInput() {
    this.setState({ searchBox: this.refs.searchBox.value });
    this.setState({ category: this.refs.category.value });
  }

  render() {
    let items = [];
    const filterprod = this.props.experts ? this.props.experts
      .filter(expert => {
        let searchCri;
        if (this.state.searchBox === '') {
          return (expert.name.length > 0) && expert.role.toLowerCase() === 'admin';
        }
        if (this.state.category !== '') {
          if (this.state.category === 'name') { searchCri = expert.name; }
          if (this.state.category === 'email') { searchCri = expert.email; }
          if (this.state.category === 'field') { searchCri = expert.field; }
        }
        return expert.name.length > 0 && expert.role.toLowerCase() === 'admin' && searchCri === this.state.searchBox;
      }) : [];
    if (this.props.experts) {
      items = filterprod.map(
        theExpert =>
          <div key={theExpert.id}>
            <Accordion active={this.state.activeSection} animate={true} openMulti={false}>
              {AccordionItem({
                title: theExpert.name,
                description: <div><b>{theExpert.field}</b></div>,
                content: <div>
                  <table >
                    <tbody>
                      <tr>Name        : {theExpert.name}</tr>
                      <tr>Field       : {theExpert.field}</tr>
                      <tr>Description : {theExpert.description}</tr>
                      <tr>Email       : {theExpert.email}</tr>
                      <div>
                        {!this.state.hide ?
                          (<button onClick={() => this.hideButton(theExpert.email)}>
                            Ask Me!
                          </button>) : null}
                        <div>
                          <p>
                            {(this.state.hide) && (
                              <Link to="/questions">
                                <button style={{ background: 'green', color: 'white' }}>
                                  Send Question
                                </button>
                              </Link>)}
                          </p>
                        </div>
                      </div>
                    </tbody>
                  </table>
                </div>
              })}
            </Accordion>
          </div>
      );
    }
    return (
      <div>
        <form >
          <input type="text" value={this.state.textbox} required ref="searchBox" placeholder="Enter Some Keywords" onChange={this.setInput.bind(this)} />
          <select ref="category">
            <option value="name">Name</option>
            <option value="field">Field</option>
            <option value="email">Email</option>
          </select>
          <p></p>
        </form>
        <p></p>
        <div>{items}</div>
      </div>
    );
  }
}

export default ViewExpert;

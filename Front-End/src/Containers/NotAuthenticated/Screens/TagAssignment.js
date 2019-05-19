import React, { Component } from 'react';
import { connect } from 'react-redux';

import t from 'tcomb-form';
import { Helmet } from 'react-helmet';

import List from 'grommet/components/List';

import ListItem from 'grommet/components/ListItem';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';

import FormsLayout, { TextLayout } from '../Layouts/Forms';

import Schemas from '../../../Services/Schemas';

import FormFooterTags from '../Components/FormFooterTags';
import TagActions from '../../../Redux/TagRedux';

import './Styles/Login.scss';

class TagAssignment extends Component {
  constructor(props) {
    super(props);
    this.schema = t.struct({
      Tag: Schemas.Tag
    });

    this.options = {
      template: FormsLayout,
      config: {
        footer: (
          <div>
            <FormFooterTags
              label='Create Tag'
              submit={e => this.submit(e)}
              label1='Send Your Info'
              sendToCard={() => this.sendToCard()}
            />
          </div>
        )
      },
      fields: {
        Tag: {
          factory: TextLayout,
          label: 'Tag Creation',
          config: {
            placeholder: 'Create Tag Here'
          }
        }
      }
    };

    this.state = {
      message: '',
      activeIndex: 0,
      Tags: [],
      TagsAdded: [],
      form: {
        Tag: ''
      }
    };
  }

  submit(e) {
    e.preventDefault();
    const value = this.form.getValue();
    if (value) {
      if (this.state.Tags.some(item => value.Tag === item.name)) {
        this.setState({ message: 'This Tag Already Exists' });
      } else {
        fetch('http://localhost:3001/api/tags', {
          method: 'POST',
          mode: 'CORS',
          body: JSON.stringify({ name: value.Tag }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          this.setState({ message: 'Tag Created' });
          fetch('http://localhost:3001/api/Tags')
            .then(response => response.json())
            .then(data => {
              this.setState({ Tags: data });
            });
          this.forceUpdate();
        }).catch(error => console.log(error));
      }
    }
  }
  sendToCard() {
    if (this.state.TagsAdded.length === 0) {
      this.setState({ message: 'You Have To Choose At Least One Tag' });
    } else {
      const carding = {
        accountID: 'admin',
        type: 'ExpertApproval',
        emailAddress: this.props.data.email,
        password: this.props.data.password,
        name: this.props.data.name,
        field: this.props.data.field,
        description: this.props.data.description,
        tags: this.state.TagsAdded
      };
      fetch('http://localhost:3001/api/Cards', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(carding),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        this.setState({ message: 'Your Information Has Been Sent, Wait For Our Email Of Approval' });
      }).catch(error => console.log(error));
    }
  }
  addToVariable(value) {
    if (this.state.TagsAdded.some(item => value.name === item.name)) {
      this.setState({ message: 'This Tag Already Added To Your List' });
    } else {
      this.setState(() => {
        this.state.TagsAdded.push(value);
      });
      this.setState({ message: 'Tag Added To Your List' });
    }
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/Tags')
      .then(response => response.json())
      .then(data => {
        this.setState({ Tags: data });
      });
  }
  render() {
    return (
      <Box className='login-wrapper' size='large'>
        <Helmet>
          <title>Office Hours | Tags</title>
        </Helmet>
        <Heading align='center' className='screen-title'>
          Choose Your Tags And/Or Create Tags
        </Heading>
        <label>{this.state.message}</label>
        <Box full={true} wrap={true} >
          <List selectable selected={this.state.activeIndex}>
            <For each='item' of={this.state.Tags} index='i'>
              <ListItem id='i' justify='between' wrap={true}
                separator='horizontal'
                key = {i} onClick={ event => this.addToVariable(item)}>
                <span>
                  {item.name}
                </span>
              </ListItem>
            </For>
          </List>
        </Box>
        <label>{this.state.message}</label>
        <t.form.Form
          ref={form => { this.form = form; }}
          value={this.state.form}
          options={this.options}
          type={this.schema}
          onChange={form => this.setState({ form })}
        />
      </Box>
    );
  }
}

const mapStateToProps = store => {
  return {
    data: store.register.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => dispatch(TagActions.tagsGet()),
    sendTag: data => dispatch(TagActions.tagSend(data)),
    sendCard: data => dispatch(TagActions.cardSend(data))
  };
};

TagAssignment.propTypes = {
  getTags: PropTypes.func,
  sendTag: PropTypes.func,
  sendCard: PropTypes.func,
  data: PropTypes.any
};
export default connect(mapStateToProps, mapDispatchToProps)(TagAssignment);

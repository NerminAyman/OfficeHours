import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';

import RegisterAction from '../../../Redux/RegisterRedux';
import FormsLayout, { TextLayout, PasswordLayout } from '../Layouts/Forms';

import Schemas from '../../../Services/Schemas';
import RegisterFooter from '../Components/RegisterFooter';
import './Styles/Login.scss';


class register extends Component {
  constructor(props) {
    super(props);
    this.schema = t.struct({
      email: Schemas.email,
      password: Schemas.password,
      name: Schemas.name,
      field: Schemas.field,
      description: Schemas.description

    });

    this.options = {
      template: FormsLayout,
      config: {
        footer: (
          <div>
            <RegisterFooter
              label='Become a Client'
              submit={e => this.submit(e)}
              label1='Become an Expert'
              sendData={e => this.sendData(e)}
            />
          </div>
        )
      },
      fields: {
        email: {
          factory: TextLayout,
          label: 'Email Address',
          config: {
            placeholder: 'Email Address ...'
          }
        },
        name: {
          factory: TextLayout,
          label: 'Name',
          config: {
            placeholder: 'Tell Us You Name ...'
          }
        },
        field: {
          factory: TextLayout,
          label: 'Field',
          config: {
            placeholder: 'What Field Are You Interested In?...'
          }
        },
        description: {
          factory: TextLayout,
          label: 'Description',
          config: {
            placeholder: 'Tell Us About Yourself In A Sentence...'
          }
        },
        password: {
          label: 'Password',
          factory: PasswordLayout,
          config: {
            placeholder: 'Your Account Password ..'
          }
        }
      }
    };

    this.state = {
      form: {
        email: '',
        name: '',
        field: '',
        description: '',
        password: ''
      }
    };
  }

  submit(e) {
    e.preventDefault();
    const value = this.form.getValue();

    if (value) {
      this.props.add(value);
    }
  }
  sendData(e) {
    e.preventDefault();
    const value = this.form.getValue();

    if (value) {
      this.props.send(value);
    }
  }

  render() {
    return (
      <Box className='login-wrapper' size='large'>
        <Helmet>
          <title>Office Hours | Register</title>
        </Helmet>

        <Heading align='center' className='screen-title'>
          Join office Hours
        </Heading>

        <Box
          className='office-hours-identity'
          direction='row'
          align='center'
          justify='center'
          margin={{ vertical: 'large' }}>
          <div className='logo'>
            <img src='/img/main-logo.svg' />
          </div>
          <div className='info'>
            <Title>RiseUp Office Hours</Title>
          </div>
        </Box>

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
    token: store.register.token,
    value: store.register.data,
    loading: store.register.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: data => {
      return dispatch(RegisterAction.register(data), dispatch(push('/login')));
    },
    send: value => {
      return dispatch(RegisterAction.act(value), dispatch(push('/TagAssignment')));
    }


  };
};

register.propTypes = {
  add: PropTypes.func,
  send: PropTypes.func,
  loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(register);

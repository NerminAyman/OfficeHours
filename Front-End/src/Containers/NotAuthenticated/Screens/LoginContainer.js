import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { Helmet } from 'react-helmet';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import AuthActions from '../../../Redux/AuthRedux';
import FormsLayout, { TextLayout, PasswordLayout } from '../Layouts/Forms';
import Schemas from '../../../Services/Schemas';

import FormFooter from '../Components/FormFooter';

import './Styles/Login.scss';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.schema = t.struct({
      email: Schemas.email,
      password: Schemas.password
    });

    this.options = {
      template: FormsLayout,
      config: {
        footer: (
          <div>
            <FormFooter
              label='Sign in to your account'
              submit={e => this.submit(e)}
              label1='Register'
              register={e => this.register()}
            />
          </div>
        )
      },
      fields: {
        email: {
          factory: TextLayout,
          label: 'Email address',
          config: {
            placeholder: 'Email address ...'
          }
        },
        password: {
          label: 'Password',
          factory: PasswordLayout,
          config: {
            placeholder: 'Your account password ..'
          }
        }
      }
    };

    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
  }

  submit(e) {
    e.preventDefault();
    const value = this.form.getValue();

    if (value) {
      this.props.request(value);
    }
  }
  register() {
    return (
      null
    );
  }
  render() {
    return (
      <Box className='login-wrapper' size='large'>
        <Helmet>
          <title>Office Hours | Login</title>
        </Helmet>

        <Heading align='center' className='screen-title'>
          Sign in to your account
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
    token: store.auth.token,
    loading: store.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    request: data => dispatch(AuthActions.login(data))
  };
};

LoginContainer.propTypes = {
  request: PropTypes.func,
  loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

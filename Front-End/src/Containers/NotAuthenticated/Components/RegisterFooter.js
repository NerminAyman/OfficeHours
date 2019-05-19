import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import FormNextLinkIcon from 'grommet/components/icons/base/FormNextLink';
// import NotAuthenticatedNavigation from '../../../Navigation/NotAuthenticated';
// import { NotAuthenticatedNavigation } from '../../../Navigation';
import './Styles/FormFooter.scss';
// import { register } from '../../register';
// import AppNavigation from '../../../Navigation';


class RegisterFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }

  disable(e) {
    this.props.disable = true;
  }
  render() {
    return (
      <div>
        <div className="footer">
          <Box align='center' pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
            <Link to="/login">
              <Button
                onClick={e => this.props.submit(e)}
                className={`success large loading-${(this.props.loading)}`}
                icon={<FormNextLinkIcon size='large' />}
                label={this.props.label}
                primary={true}
                type='submit'
              />
            </Link>
          </Box>
          <Box align='center' pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
            <Link to="/TagAssignment">
              <Button
                onClick={e => this.props.sendData(e)}
                className={`success large loading-${(this.props.loading)}`}
                icon={<FormNextLinkIcon size='large'/>}
                label={this.props.label1}
                primary={true}
                type='submit'
              />
            </Link>
          </Box>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    loading: store.blocker.loading
  };
};

RegisterFooter.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool,
  disable: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  sendData: PropTypes.func,
  label: PropTypes.string,
  label1: PropTypes.string
};

export default connect(mapStateToProps, null)(RegisterFooter);

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


class FormFooter extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <Box align='center' pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
            <Button
              onClick={e => this.props.submit(e)}
              className={`success large loading-${(this.props.loading)}`}
              icon={<FormNextLinkIcon size='large' />}
              label={this.props.label}
              primary={true}
              type='submit'
            />
          </Box>
          <Box align='center' pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
            <Link to="/register">
              <Button
                className={`success large loading-${(this.props.loading)}`}
                icon={<FormNextLinkIcon size='large' />}
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

FormFooter.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  label: PropTypes.string,
  label1: PropTypes.string
};

export default connect(mapStateToProps, null)(FormFooter);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import FormNextLinkIcon from 'grommet/components/icons/base/FormNextLink';
import './Styles/FormFooter.scss';

class FormFooterTags extends Component {
  render() {
    return (
      <div className="footer">
        <Box align='center' pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
          <Button
            onClick={e => this.props.submit(e)}
            className={`success large loading-${(this.props.loading)}`}
            icon={<FormNextLinkIcon size='large' />}
            label={this.props.label}
            primary={false}
            type='submit'
          />
        </Box>
        <Box align='center' pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
          <Link to="/login">
            <Button
              onClick={() => this.props.sendToCard()}
              className={`success large loading-${(this.props.loading)}`}
              icon={<FormNextLinkIcon size='large' />}
              label={this.props.label1}
              primary={true}
              type='submit'
            />
          </Link>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    loading: store.blocker.loading
  };
};

FormFooterTags.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  sendToCard: PropTypes.func.isRequired,
  label: PropTypes.string,
  label1: PropTypes.string
};

export default connect(mapStateToProps, null)(FormFooterTags);

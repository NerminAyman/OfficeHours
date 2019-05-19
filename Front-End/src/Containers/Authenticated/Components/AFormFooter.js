import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

import './Styles/FormFooter.scss';

class FormFooter extends Component {
  render() {
    return (
      <Footer className='section-footer'>
        <Box margin={{ right: 'medium' }}>
          <Button label={this.props.label}
            type='submit'
            primary={true}
            className={`loading-${(this.props.loading)}`}
            onClick={e => this.props.submit(e)}
          />
        </Box>
        <Button label='Cancel'
          type='button'
          className={`no-loading default ${(this.props.loading) ? 'disabled' : ''}`}
          onClick={() => this.props.close() }
        />
      </Footer>
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
  close: PropTypes.func,
  label: PropTypes.string
};

export default connect(mapStateToProps, null)(FormFooter);

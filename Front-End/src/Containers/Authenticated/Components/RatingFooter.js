
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

import './Styles/FormFooter.scss';

class RatingFooter extends Component {
  render() {
    return (
      <Footer className='section-footer'>
        <Box margin={{ right: 'medium' }}>
          <Button label={this.props.label} style={{ position: 'relative', bottom: -20, left: 180 }}
            type='submit'
            primary={true}
            className={`loading-${(this.props.loading)}`}
            onClick={e => this.props.submit(e)}
          />
        </Box>
      </Footer>
    );
  }
}

const mapStateToProps = store => {
  return {
    loading: store.blocker.loading
  };
};

RatingFooter.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func,
  label: PropTypes.string
};

export default connect(mapStateToProps, null)(RatingFooter);

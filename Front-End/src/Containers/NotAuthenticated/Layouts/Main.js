import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';

import './Styles/Main.scss';

class MainLayout extends Component {
  render() {
    return (
      <App className='wrapper' centered={true}>

        <header>
          <div className='logo'>
            <img src='/img/main-logo.svg' />
          </div>
        </header>

        <Box className='content' margin={{ top: 'large' }} align='center'>
          {this.props.children}
        </Box>
      </App>
    );
  }
}

const mapStateToProps = store => {
  return {};
};

MainLayout.propTypes = {
  children: PropTypes.element
};

export default connect(mapStateToProps, null)(MainLayout);

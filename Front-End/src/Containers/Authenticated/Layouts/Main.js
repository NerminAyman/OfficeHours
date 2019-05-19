import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Grommet
import Box from 'grommet/components/Box';

import './Styles/Main.scss';

import Navigation from '../Components/Navigation';
import Header from '../Components/Header';

class MainLayout extends Component {
  render() {
    return (
      <Box
        className='auth-wrapper'
        direction='row'>

        <Box align='end' basis='1/3'>
          <Navigation />
        </Box>

        <Box basis='full'>
          <div className='content'>
            <Header />

            { this.props.children }
          </div>
        </Box>

        <Box basis='1/4' />
      </Box>
    );
  }
}

const mapStateToProps = store => {
  return {};
};

MainLayout.propTypes = {
  children: PropTypes.element
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

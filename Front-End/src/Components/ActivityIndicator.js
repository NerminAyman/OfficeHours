import React from 'react';
import PropTypes from 'prop-types';

import './Styles/ActivityIndicator.scss';

function ActivityIndicator(props) {
  return <div className={`activity-indicator ${props.configs}`} />;
}

ActivityIndicator.propTypes = {
  configs: PropTypes.string
};

export default ActivityIndicator;

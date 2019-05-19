import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import AccordionPanel from 'grommet/components/AccordionPanel';

import './Styles/Accordion.scss';

function AccordionItem(props) {
  return (
    <AccordionPanel
      className={(props.disabled) ? 'disabled' : ''}
      heading={
        <Box direction='row' flex={true}>
          <Box basis='1/4'>
            { props.title }
          </Box>
          <Box className='desc' flex={true}>
            { props.description }
          </Box>
          <If condition={ !props.disabled }>
            <Box className='open-placeholder'>
              { props.expandPlaceholder || 'About' }
            </Box>
          </If>
        </Box>
      }>
      <Box direction='row'>
        <Box basis='1/4'>
          <Heading
            className='section-title'
            strong={false}
            tag='h4'>
            { props.title }
          </Heading>
        </Box>
        <Box basis='3/4'>
          { props.content }
        </Box>
      </Box>
    </AccordionPanel>
  );
}

AccordionItem.propTypes = {
  disabled: PropTypes.bool,
  content: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  expandPlaceholder: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ])
};

export default AccordionItem;

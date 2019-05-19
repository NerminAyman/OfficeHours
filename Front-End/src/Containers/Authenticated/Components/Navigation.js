import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Image from 'grommet/components/Image';
import Value from 'grommet/components/Value';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';

import './Styles/Navigation.scss';


class Navigation extends Component {
  render() {
    return (
      <div>
        <div className='navigation-widget'>
          <Image src ="https://thumb.ibb.co/nOo7XH/gitzz.png"
            full={false} />
          <Image src='https://thumb.ibb.co/bGYUUx/star.jpg' size='thumb' />
          <Value
            label='Your Rating is : '
            value={3}
            size='large' />
          <FormField>
            <RadioButton id='choice1-1'
              name='choice1-1'
              label='1'
              disabled={true}
              defaultChecked={false}/><RadioButton id='choice1-2'
              name='choice1-2'
              label='2'
              disabled={true}
              defaultChecked={false}/>
            <RadioButton id='choice1-3'
              name='choice1-3'
              label='3'
              disabled={false}
              defaultChecked={true}/>
            <RadioButton id='choice1-4'
              name='choice1-4'
              label='4'
              disabled={true}
              defaultChecked={false}/>
            <RadioButton id='choice1-5'
              name='choice1-5'
              label='5'
              disabled={true}
              defaultChecked={false}/>
          </FormField>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    router: store.router,
    account: store.account.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: path => dispatch(push(path))
  };
};


Navigation.propTypes = {
  navigate: PropTypes.func,
  router: PropTypes.object,
  account: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

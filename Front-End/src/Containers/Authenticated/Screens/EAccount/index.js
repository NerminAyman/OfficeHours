import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// Grommet
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionItem from '../../Components/Accordion';

import AccountNameSection from './Sections/AccountName';
import AccountEmailSection from './Sections/AccountEmail';
import AccountChangePasswordSection from './Sections/AccountChangePassword';
import AccountDescrSection from './Sections/AccountDescription';
import AccountFieldSection from './Sections/AccountField';

import AccountActions from '../../../../Redux/AccountRedux';

import ActivityIndicator from '../../../../Components/ActivityIndicator';

import './Styles.scss';

class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: []
    };
  }

  componentDidMount() {
    this.props.get();
  }

  render() {
    return (
      <Box pad='medium' className='dashboard-settings'>
        <Helmet>
          <title>Office Hours | Account Settings</title>
        </Helmet>

        <Box>
          <Heading tag='h3' className='screen-title'>
            Account Settings
          </Heading>
        </Box>
        <Choose>
          <When condition={ this.props.fetching || !this.props.account.id }>
            <Box align='center' pad='xlarge' margin='large'>
              <ActivityIndicator />
            </Box>
          </When>
          <Otherwise>
            <Accordion active={this.state.activeSection} animate={false} openMulti={false}>

              {AccordionItem({
                title: 'Name',
                description: <div><b>{this.props.account.name}</b></div>,
                content: <AccountNameSection close={() => this.setState({ activeSection: [] })} />
              })}

              {AccordionItem({
                title: 'Email address',
                description: <div>{this.props.account.email}</div>,
                content: <AccountEmailSection close={() => this.setState({ activeSection: [] })} />
              })}

              {AccordionItem({
                title: 'Password',
                description: <div>You can change your password here</div>,
                expandPlaceholder: 'Change password',
                content:
                <AccountChangePasswordSection close={() => this.setState({ activeSection: [] })} />
              })}

              {AccordionItem({
                title: 'Description',
                description: <div><b>{this.props.account.description}</b></div>,
                content: <AccountDescrSection close={() => this.setState({ activeSection: [] })} />
              })}

              {AccordionItem({
                title: 'Field',
                description: <div>{this.props.account.field}</div>,
                content: <AccountFieldSection close={() => this.setState({ activeSection: [] })} />
              })}


            </Accordion>
          </Otherwise>
        </Choose>
      </Box>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store.account.data,
    fetching: store.account.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: () => dispatch(AccountActions.accountGet())
  };
};

AccountScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

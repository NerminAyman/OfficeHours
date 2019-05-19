import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';

import ActivityIndicator from '../../../Components/ActivityIndicator';

import AuthActions from '../../../Redux/AuthRedux';
import AccountActions from '../../../Redux/AccountRedux';

import './Styles/Header.scss';
import Comment from '../../../Navigation/Comment';
import Rating from '../../../Navigation/Rating';
import Card from '../../../Navigation/Card';
import ClientMeeting from '../../../Navigation/ClientMeeting';

class Header extends Component {
  componentWillMount() {
    this.props.getUser();
  }
  constructor(props) {
    super(props);
    this.state = { FlagC: true,
      FlagN: true,
      FlagClientMeeting: true,
      FlagCard: true,
      FlagComment: true,
      FlagRating: true };
  }
  render() {
    return (
      <div>
        <header>
          <div className='logo'>
            <img src='/img/main-logo.svg' />
          </div>

          <Box direction='row' align='center'>
            <Menu
              size='small'
              responsive={true}
              inline={true}
              direction='row'>
              <Anchor href='#' className='active'>
                <If condition= { this.props.account.role } >
                  { this.props.account.role.toUpperCase() }
                </If>
              </Anchor>
              <Anchor href='/Search' className='active'>
                Look For An Expert
              </Anchor>
              <Anchor href='/SendingRequest' className='active'>
                Send Meeting Request
              </Anchor>

              <Anchor onClick = { () => this.setState({ FlagCard: false })}
                href='/viewcards' className='active'>
                Inbox Card
              </Anchor>
              <Anchor onClick = { () => this.setState({ FlagComment: false })}
                href='#' className='active'>
                Comments
              </Anchor>
              <Anchor onClick = { () => this.setState({ FlagRating: false })}
                href='#' className='active'>
                My Rating
              </Anchor>

              <Anchor href='/account' className='active'>
                Edit Profile
                <Box margin={{ left: 'medium' }} >
                  <Choose>
                    <When condition={ this.props.fetching }>
                      <Box pad='small'>
                        <ActivityIndicator configs='medium' />
                      </Box>
                    </When>
                  </Choose>
                </Box>
                <Box margin={{ left: 'medium' }} >
                  <Choose>
                    <When condition={ this.props.fetching }>
                      <Box pad='small'>
                        <ActivityIndicator configs='medium' />
                      </Box>
                    </When>
                  </Choose>
                </Box>
              </Anchor>
            </Menu>

            <Layer overlayClose ={true} hidden={this.state.FlagComment} closer={true}
              onClose={() => this.setState({ FlagComment: true })}>
              <Box>
                <Comment/>
              </Box>
            </Layer>

            <Layer overlayClose ={true} hidden={this.state.FlagRating} closer={true}
              onClose={() => this.setState({ FlagRating: true })}>
              <Box>
                <Rating/>
              </Box>
            </Layer>
            <Layer hidden={this.state.FlagN} closer={true}
              onClose={() => this.setState({ FlagN: true })}>
              <Box>
                <h1>Notifications Center</h1>
              </Box>
            </Layer>
            <Layer overlayClose ={true} hidden={this.state.FlagCard} closer={true}
              onClose={() => this.setState({ FlagCard: true })}>
              <Box>
                <Card/>
              </Box>
            </Layer>

            <Layer overlayClose ={true} hidden={this.state.FlagClientMeeting} closer={true}
              onClose={() => this.setState({ FlagClientMeeting: true })}>
              <Box>
                <ClientMeeting />
              </Box>
            </Layer>
            <Layer hidden={this.state.FlagC} closer={true}
              onClose={() => this.setState({ FlagC: true })}>
              <Box>
                <h1>Cardbox</h1>
              </Box>
            </Layer>
            <Box margin={{ left: 'medium' }} >
              <Choose>
                <When condition={ this.props.fetching }>
                  <Box pad='small'>
                    <ActivityIndicator configs='medium' />
                  </Box>
                </When>
                <Otherwise>
                  <Menu
                    responsive={true}
                    size='small'
                    direction='row'
                    icon={
                      <Box direction='row' align='center'>
                        <Box margin={{ right: 'small' }}>
                          <Heading margin='none' tag='h6' strong={true}>
                            HI, { this.props.account.name }
                          </Heading>
                        </Box>
                      </Box>
                    }>
                    <Anchor onClick={() => this.props.logout()} href='#'
                      className='active'>
                      Logout
                    </Anchor>
                  </Menu>
                </Otherwise>
              </Choose>
            </Box>
          </Box>
        </header>
      </div>
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
    logout: () => dispatch(AuthActions.logout()),
    getUser: () => dispatch(AccountActions.accountGet())
  };
};

Header.propTypes = {
  logout: PropTypes.func,
  getUser: PropTypes.func,
  account: PropTypes.object,
  fetching: PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);

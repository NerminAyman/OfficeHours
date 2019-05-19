import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import './Styles/Navigation.scss';


class ANavigation extends Component {
  render() {
    return (
      <div>
        <div className='navigation-wrapper'>
          <Image src='https://image.ibb.co/mZJGfS/Hello.jpg' >
          </Image>
          <div className='navigation-widget'>
            <Heading tag='h3'>
              {this.props.account.name}
            </Heading>
            <Heading tag='h6'>
              {this.props.account.description}
            </Heading>
          </div>
          <Menu size='medium'>

            {(this.props.account.role === 'Admin' || this.props.account.role === 'admin') ? (
              <Anchor
                onClick={() => this.props.navigate('/ViewRate')}
                className={(this.props.router.location.pathname === '/ViewRate') ? 'active' : ''}>
                <img src='/img/menu-icons/account-and-security.png' /> view Rating
              </Anchor>
            ) : (
              <div>
              </div>
            )
            }
            {(this.props.account.role === 'Admin' || this.props.account.role === 'admin') ? (
              <Anchor
                onClick={() => this.props.navigate('/ViewComment')}
                className={(this.props.router.location.pathname === '/ViewComment') ? 'active' : ''}>
                <img src='/img/menu-icons/account-and-security.png' /> view Comments
              </Anchor>
            ) : (
              <div>
              </div>
            )
            }
          </Menu>
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


ANavigation.propTypes = {
  navigate: PropTypes.func,
  router: PropTypes.object,
  account: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ANavigation);

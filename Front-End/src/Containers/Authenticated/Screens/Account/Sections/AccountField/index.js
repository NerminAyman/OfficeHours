import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form';

// Grommet
import Box from 'grommet/components/Box';

import Schemas from '../../../../../../Services/Schemas';
import FormsLayout, { TextLayout } from '../../../../Layouts/Forms';

import AccountActions from '../../../../../../Redux/AccountRedux';

import FormFooter from '../../../../Components/FormFooter';

import './Styles.scss';

class AccountFieldSection extends Component {
  constructor(props) {
    super(props);

    this.schema = t.struct({
      field: Schemas.field
    });

    this.options = {
      template: FormsLayout,
      config: {
        footer: (
          <FormFooter
            submit={e => this.update(e)}
            close={() => this.props.close()}
            label='Update Field'
          />
        )
      },
      fields: {
        field: {
          factory: TextLayout,
          label: 'Field',
          config: {
            placeholder: 'Your Field ..'
          }
        }
      }
    };

    this.state = {
      form: {
        field: ''
      }
    };
  }

  componentDidMount() {
    this.setState({
      form: this.props.account
    });
  }

  update(e) {
    e.preventDefault();
    const value = this.form.getValue();

    if (value) {
      this.props.update(value);
    }
  }

  render() {
    return (
      <Box className='dashboard-form-wrapper'>
        <t.form.Form
          ref={form => { this.form = form; }}
          value={this.state.form}
          options={this.options}
          type={this.schema}
          onChange={form => this.setState({ form })}
        />
      </Box>
    );
  }
}

const mapStateToProps = store => {
  return {
    loading: store.account.loading,
    updated: store.account.updated,
    error: store.account.error,
    account: store.account.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: data => dispatch(AccountActions.accountUpdate(data))
  };
};

AccountFieldSection.propTypes = {
  update: PropTypes.func,
  close: PropTypes.func,
  loading: PropTypes.bool,
  account: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountFieldSection);

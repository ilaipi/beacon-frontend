import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as customersActionCreator from 'Models/customer/actions';
import CustomerView from 'Pages/Customer';

@connect(
  state => ({
    customer: state.get('Customer').get('current').toJS()
  }),
  dispatch => ({
    customersActions: bindActionCreators(customersActionCreator, dispatch),
  })
)
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {}
    };
  }
  render () {
    return (
      <CustomerView
        saveCustomer={this.props.customersActions.saveCustomer}
      />
    )
  }
}

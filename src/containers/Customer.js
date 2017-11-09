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
  componentDidMount() {
    const { path } = this.props.route;
    if (path === '_new') return;
    const { id } = this.props.routeParams;
    const { customersActions } = this.props;
    customersActions.getCustomer(id)
    .then(() => {
      const { customer } = this.props;
      this.setState({ customer: customer.data });
    });
  }
  render () {
    return (
      <CustomerView
        saveCustomer={this.props.customersActions.saveCustomer}
        customer={this.state.customer}
      />
    )
  }
}

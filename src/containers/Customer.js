import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';

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
  saveCustomer = () => {
    const { saveCustomer } = this.props.customersActions;
    saveCustomer()
    .then(() => {
      notification.success({
        message: '',
        description: '保存成功！',
        duration: 2
      });
    });
  }
  render () {
    return (
      <CustomerView
        saveCustomer={this.saveCustomer}
        customer={this.state.customer}
      />
    )
  }
}

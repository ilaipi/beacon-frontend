import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as customersActionCreator from 'Models/customer/actions';
import CustomersView from 'Pages/Customers';

@connect(
  state => ({
    customers: state.get('Customer').get('list').toJS()
  }),
  dispatch => ({
    customersActions: bindActionCreators(customersActionCreator, dispatch),
  })
)
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }
  componentDidMount() {
    this.loadCustomers().then(() => {
      const { customers = {} } = this.props;
      this.setState({ customers: customers.data });
    });
  }
  loadCustomers = () => {
    const { loadCustomers } = this.props.customersActions;
    return loadCustomers();
  }
  render () {
    const { customers } = this.state;
    return (
      <CustomersView
        customers={customers}
      />
    )
  }
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as burnintestsActionCreator from 'Models/burnintest/actions';
import * as customersActionCreator from 'Models/customer/actions';
import BurnintestsView from 'Pages/Burnintests';

@connect(
  state => ({
    burnintests: state.get('Burnintests').toJS(),
    customers: state.get('Customer').get('list').toJS()
  }),
  dispatch => ({
    burnintestsActions: bindActionCreators(burnintestsActionCreator, dispatch),
    customersActions: bindActionCreators(customersActionCreator, dispatch)
  })
)
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      burnintests: [],
      customers: []
    };
  }
  componentDidMount() {
    this.loadBurnintests();
    this.props.customersActions.loadCustomers().then(() => {
      const { customers = {} } = this.props;
      this.setState({ customers: customers.data });
    });
  }
  loadBurnintests = (customer) => {
    const { loadBurnintests } = this.props.burnintestsActions;
    return loadBurnintests(customer).then(() => {
      const { burnintests = {} } = this.props;
      this.setState({ burnintests: burnintests.data });
    });
  }
  changeCustomer = customer => this.loadBurnintests(customer)
  render () {
    const { burnintests, customers } = this.state;
    return (
      <BurnintestsView
        burnintests={burnintests}
        customers={customers}
        changeCustomer={this.changeCustomer}
      />
    )
  }
}

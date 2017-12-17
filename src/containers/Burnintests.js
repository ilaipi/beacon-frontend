import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

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
      total: 0,
      customers: []
    };
  }
  componentDidMount() {
    this.loadBurnintests({
      from: moment().startOf('month').format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      limit: 15,
      page: 1
    });
    this.props.customersActions.loadCustomers().then(() => {
      const { customers = {} } = this.props;
      this.setState({ customers: customers.data });
    });
  }
  loadBurnintests = (params) => {
    const { loadBurnintests } = this.props.burnintestsActions;
    return loadBurnintests(params).then(() => {
      const { burnintests: { data = {} } = {} } = this.props;
      this.setState({ burnintests: data.docs, total: data.total });
    });
  }
  render () {
    const { burnintests, total, customers } = this.state;
    return (
      <BurnintestsView
        burnintests={burnintests}
        customers={customers}
        loadBurnintests={this.loadBurnintests}
        total={total}
      />
    )
  }
}

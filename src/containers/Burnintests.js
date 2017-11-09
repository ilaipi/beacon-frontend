import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as burnintestsActionCreator from 'Models/burnintest/actions';
import BurnintestsView from 'Pages/Burnintests';

@connect(
  state => ({
    burnintests: state.get('Burnintests').toJS()
  }),
  dispatch => ({
    burnintestsActions: bindActionCreators(burnintestsActionCreator, dispatch),
  })
)
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      burnintests: []
    };
  }
  componentDidMount() {
    this.loadBurnintests().then(() => {
      const { burnintests = {} } = this.props;
      this.setState({ burnintests: burnintests.data });
    });
  }
  loadBurnintests = () => {
    const { loadBurnintests } = this.props.burnintestsActions;
    return loadBurnintests();
  }
  render () {
    const { burnintests } = this.state;
    return (
      <BurnintestsView
        burnintests={burnintests}
      />
    )
  }
}

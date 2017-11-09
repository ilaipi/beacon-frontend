import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as burninbeatsActionCreator from 'Models/burninbeat/actions';
import BurninbeatsView from 'Pages/Burninbeats';

@connect(
  state => ({
    burninbeats: state.get('Burninbeats').toJS()
  }),
  dispatch => ({
    burninbeatsActions: bindActionCreators(burninbeatsActionCreator, dispatch),
  })
)
export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      burninbeats: []
    };
  }
  componentDidMount() {
    this.loadBurninbeats().then(() => {
      const { burninbeats = {} } = this.props;
      this.setState({ burninbeats: burninbeats.data });
    });
  }
  loadBurninbeats = () => {
    const { loadBurninbeats } = this.props.burninbeatsActions;
    const { burnintest } = this.props.routeParams;
    return loadBurninbeats(burnintest);
  }
  render () {
    const { burninbeats } = this.state;
    return (
      <BurninbeatsView
        burninbeats={burninbeats}
      />
    )
  }
}

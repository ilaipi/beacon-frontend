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
      burninbeats: [],
      total: 0
    };
  }
  componentDidMount() {
    this.loadBurninbeats();
  }
  loadBurninbeats = (page = 1) => {
    const { loadBurninbeats } = this.props.burninbeatsActions;
    const { burnintest } = this.props.routeParams;
    loadBurninbeats({ burnintest, limit: 15, page }).then(() => {
      const { burninbeats = {} } = this.props;
      this.setState({ burninbeats: burninbeats.data.docs, total: burninbeats.data.total });
    });
  }
  render () {
    const { burninbeats, total } = this.state;
    return (
      <BurninbeatsView
        loadBurninbeats={this.loadBurninbeats}
        burninbeats={burninbeats}
        total={total}
      />
    )
  }
}

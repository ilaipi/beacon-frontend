import React, { Component } from 'react';
import {
  Table
} from 'antd';

import { BURNINTESTS_COLUMNS } from './../services/burnin';

class BurnintestsView extends Component {
  render() {
    const { burnintests } = this.props;
    return (
      <div>
        <Table dataSource={burnintests} columns={BURNINTESTS_COLUMNS} rowKey="record" />
      </div>
    );
  }
}
export default BurnintestsView;

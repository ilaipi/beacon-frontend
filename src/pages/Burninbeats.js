import React, { Component } from 'react';
import {
  Table
} from 'antd';

import { BURNINBEATS_COLUMNS } from './../services/burnin';

class BurninbeatsView extends Component {
  render() {
    const { burninbeats } = this.props;
    return (
      <div>
        <Table
          bordered
          dataSource={burninbeats}
          columns={BURNINBEATS_COLUMNS}
          rowKey="id"
          scroll={{ x: 8 * 150 * 6 + 300, y: 640 }}
        />
      </div>
    );
  }
}
export default BurninbeatsView;

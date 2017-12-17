import React, { Component } from 'react';
import {
  Table
} from 'antd';

import { BURNINBEATS_COLUMNS } from './../services/burnin';

class BurninbeatsView extends Component {
  state = {
    page: 1
  }

  changePage = page => this.setState({ page });

  render() {
    const { burninbeats, total, loadBurninbeats } = this.props;
    return (
      <div>
        <Table
          bordered
          dataSource={burninbeats}
          columns={BURNINBEATS_COLUMNS}
          rowKey="id"
          scroll={{ x: 8 * 150 * 6 + 300, y: 640 }}
          pagination={{
            current: this.state.page,
            pageSize: 15,
            showTotal: (totalRows, range) => `${range[0]}-${range[1]} 共 ${totalRows}`,
            total,
            onChange: (page) => {
              this.changePage(page);
              loadBurninbeats(page);
            }
          }}
        />
      </div>
    );
  }
}
export default BurninbeatsView;

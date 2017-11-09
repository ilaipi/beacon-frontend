import React, { Component } from 'react';
import {
  Table
} from 'antd';
import { Link } from 'react-router';

const columns = [{
  title: '唯一标识',
  dataIndex: 'record',
  key: 'record'
}, {
  title: '操作员',
  dataIndex: 'operator',
  key: 'operator'
}, {
  title: '良品率',
  dataIndex: 'goodP',
  key: 'goodP',
  render: (text, row) => `${text}% (${row.good} / ${row.amount})`
}, {
  title: '节约电量',
  dataIndex: 'economyKWH',
  key: 'economyKWH',
  render: (text, row) => `${text} (${row.theoryKWH} - ${row.realKWH})`
}, {
  dataIndex: 'id',
  render: (text, burnintest) => (
    <Link
      to={{
        pathname: `/burnintests/${burnintest.record}`
      }}
    >
      查看详细记录
    </Link>
  )
}];

class BurnintestsView extends Component {
  render() {
    const { burnintests } = this.props;
    return (
      <div>
        <Table dataSource={burnintests} columns={columns} rowKey="record" />
      </div>
    );
  }
}
export default BurnintestsView;

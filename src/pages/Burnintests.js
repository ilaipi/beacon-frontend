import React, { Component } from 'react';
import {
  Table
} from 'antd';
import { Link } from 'react-router';
import moment from 'moment';

const columns = [{
  title: '开始时间',
  dataIndex: 'startTime',
  render: text => moment(new Date(text)).format('YYYY/MM/DD HH:mm')
}, {
  title: '老化时长（分钟）',
  dataIndex: 'duration'
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

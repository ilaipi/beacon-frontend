import React, { Component } from 'react';
import {
  Table
} from 'antd';

const buildHeader = () => {
  // 6层
  const headers = [];
  for (let i = 1; i < 7; i += 1) {
    // 每层8个
    const floor = [];
    for (let j = 1; j < 9; j += 1) {
      floor.push({
        title: `第${j}个`,
        width: 150,
        children: [
          {
            title: '电压',
            dataIndex: `data[${i - 1}][${j - 1}].v`,
            width: 50
          },
          {
            title: '电流',
            dataIndex: `data[${i - 1}][${j - 1}].i`,
            width: 50
          },
          {
            title: '状态',
            dataIndex: `data[${i - 1}][${j - 1}].status`,
            width: 50
          }
        ]
      });
    }
    headers.push({ title: `第${i}层`, children: floor });
  }
  return headers;
};

const mergedHeaders = buildHeader();
console.log('mergedHeaders', mergedHeaders);

const columns = [{
  title: '时间',
  dataIndex: 'date',
  key: 'date',
  width: 100,
  fixed: 'left'
}, {
  title: '数据详情',
  children: mergedHeaders
}, {
  title: '老化架',
  dataIndex: 'device',
  key: 'device',
  width: 100,
  fixed: 'right'
}];

class BurninbeatsView extends Component {
  render() {
    const { burninbeats } = this.props;
    return (
      <div>
        <Table
          bordered
          dataSource={burninbeats}
          columns={columns}
          rowKey="id"
          scroll={{ x: true, y: 640 }}
        />
      </div>
    );
  }
}
export default BurninbeatsView;

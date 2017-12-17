import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

/**
 * 老化录的表头
 */
export const BURNINTESTS_COLUMNS = [
  {
    title: '开始时间',
    dataIndex: 'startTime',
    render: text => moment(new Date(text)).format('YYYY/MM/DD HH:mm')
  }, {
    title: '机种参数',
    dataIndex: 'deviceType'
  }, {
    title: '批次',
    dataIndex: 'batch'
  }, {
    title: '老化时长（小时）',
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
  }
];

const buildHeader = () => {
  // 6层
  const headers = [];
  for (let i = 1; i < 7; i += 1) {
    // 每层8个
    const floor = [];
    for (let j = 1; j < 9; j += 1) {
      floor.push({
        title: `第${j}个`,
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

/**
 * 老化详细记录的表头
 */
export const BURNINBEATS_COLUMNS = [
  {
    title: '时间',
    dataIndex: 'date',
    key: 'date',
    width: 100,
    fixed: 'left',
    render: text => moment(new Date(text)).format('MM/DD HH:mm')
  }, {
    title: '数据详情',
    children: mergedHeaders
  }, {
    title: '老化架',
    dataIndex: 'device',
    key: 'device',
    width: 100,
    fixed: 'right'
  }
];

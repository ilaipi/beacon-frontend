import React, { Component } from 'react';
import {
  Table, Row, Col, Select
} from 'antd';
import { map } from 'lodash';

import { BURNINTESTS_COLUMNS } from './../services/burnin';

const { Option } = Select;

class BurnintestsView extends Component {
  render() {
    const { burnintests, customers, changeCustomer } = this.props;
    const options = map(customers, ({ name, sn }) => <Option value={sn}>{name}</Option>);
    return (
      <div>
        <Row style={{ marginBottom: '12px' }}>
          <Col sm={4}>
            <Select
              onChange={changeCustomer}
              dropdownMatchSelectWidth={false}
              style={{ width: '100%' }}
              allowClear
              placeholder="选择客户"
            >
              {options}
            </Select>
          </Col>
        </Row>
        <Table dataSource={burnintests} columns={BURNINTESTS_COLUMNS} rowKey="record" />
      </div>
    );
  }
}
export default BurnintestsView;

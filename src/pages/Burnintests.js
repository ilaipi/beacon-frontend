import React, { Component } from 'react';
import {
  Table, Row, Col, Select, Button,
  DatePicker
} from 'antd';
import { map } from 'lodash';
import moment from 'moment';

import { BURNINTESTS_COLUMNS } from './../services/burnin';

const { Option } = Select;
const { RangePicker } = DatePicker;

class BurnintestsView extends Component {
  state = {
    from: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
    customer: undefined
  }
  setDate = (dates, dateStrings) => {
    this.setState({
      from: dateStrings[0],
      end: dateStrings[1]
    });
  }

  render() {
    const { burnintests, customers, loadBurnintests } = this.props;
    const options = map(customers, ({ name, sn }) => <Option value={sn}>{name}</Option>);
    const currentMonth = [moment().startOf('month'), moment()];
    return (
      <div>
        <Row gutter={4} style={{ marginBottom: '12px' }}>
          <Col sm={4}>
            <Select
              onChange={customer => this.setState({ customer })}
              dropdownMatchSelectWidth={false}
              style={{ width: '100%' }}
              allowClear
              placeholder="选择客户"
            >
              {options}
            </Select>
          </Col>
          <Col sm={8}>
            <RangePicker
              allowClear={false}
              defaultValue={currentMonth}
              ranges={{ 本月: currentMonth }}
              format="YYYY-MM-DD"
              onChange={this.setDate}
            />
          </Col>
          <Col sm={3}>
            <Button
              type="primary"
              onClick={() => loadBurnintests(this.state)}
            >
              查询
            </Button>
          </Col>
          <Col>
            (tips: 包含开始和结束日期)
          </Col>
        </Row>
        <Table dataSource={burnintests} columns={BURNINTESTS_COLUMNS} rowKey="record" />
      </div>
    );
  }
}
export default BurnintestsView;

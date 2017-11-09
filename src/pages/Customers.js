import React, { Component } from 'react';
import {
  Table,
  Row, Col, Button
} from 'antd';
import { Link } from 'react-router';

const columns = [{
  title: '唯一标识',
  dataIndex: 'sn',
  key: 'sn',
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '',
  dataIndex: 'id',
  render: (text, customer) => (
    <Link
      to={{
        pathname: `/customers/${customer.id}`
      }}
    >
      编辑
    </Link>
  )
}];

class CustomersView extends Component {
  render() {
    const { customers } = this.props;
    return (
      <div>
        <Row>
          <Col>
            <Link to={{ pathname: '/customers/_new' }}>
              <Button icon="plus" type="primary"> 新增 </Button>
            </Link>
          </Col>
        </Row>
        <Table dataSource={customers} columns={columns} rowKey="sn" />
      </div>
    );
  }
}
export default CustomersView;


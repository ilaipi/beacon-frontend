import React, { Component } from 'react';
import {
  Form, Input, Button, Switch
} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 4, offset: 4 },
};

class CustomerView extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveCustomer(this.props.form.getFieldsValue());
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { customer } = this.props;
    // 默认是启用
    let status;
    switch (customer.status) {
      case 'normal':
        status = true;
        break;
      case 'disabled':
        status = false;
        break;
      default:
        status = true;
        break;
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="sn" hasFeedback>
          {getFieldDecorator('sn', {
            rules: [{
              required: true,
              message: '必须设置唯一标识',
            }],
            initialValue: customer.sn
          })(
            <Input placeholder="请输入唯一标识" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="名称" hasFeedback>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '客户名称',
            }],
            initialValue: customer.name
          })(
            <Input placeholder="请输入客户名称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
            initialValue: customer.email
          })(
            <Input placeholder="请输入客户邮箱" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否启用"
        >
          {getFieldDecorator('status', {
            valuePropName: 'checked',
            initialValue: status
          })(
            <Switch />
          )}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit"> 保存 </Button>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(CustomerView);

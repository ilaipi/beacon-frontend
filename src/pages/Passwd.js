import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import reactMixin from 'react-mixin';
import { Form, Input, Button, Icon } from 'antd';
import axios from 'axios';

import updateState from 'Mixins/updateState';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    sm: { span: 4, offset: 4 }
  },
  wrapperCol: {
    sm: { span: 8 }
  },
};

const ErrorMsg = ({ error }) => (
  <p style={{ marginTop: -20, textAlign: 'center', color: 'red', lineHeight: '30px' }}>
    {error}
  </p>
)
@reactMixin.decorate(updateState)
class PasswdView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      password: '',
      repassword: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateState = this.updateState.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { current, password, repassword } = this.state;
    if (password !== repassword) {
      this.setState({ error: '新密码输入不一致' });
      return;
    }
    if (!password || !current) {
      this.setState({ error: '密码不能为空' });
      return;
    }
    axios.post('/api/passwd', { current, password })
    .then(() => {
      toastr.success('修改成功');
      this.setState({ error: '' });
    })
    .catch((error = {}) => {
      const { message = '未知错误' } = error;
      this.setState({ error: message });
    });
  }
  render() {
    const { error } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="当前密码"
        >
          {getFieldDecorator('current', {
            rules: [
              { required: true, message: '当前密码' }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              placeholder="请输入当前密码"
              type="password"
              onChange={e => this.updateState('current')(e.target.value)}
            />
          )}
        </FormItem>
        <FormItem
          hasFeedback
          label="新密码"
          {...formItemLayout}
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' }
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              placeholder="请输入新密码"
              onChange={e => this.updateState('password')(e.target.value)}
            />
          )}
        </FormItem>
        <FormItem
          hasFeedback
          label="新密码"
          {...formItemLayout}
        >
          {getFieldDecorator('repassword', {
            rules: [
              { required: true, message: '请再次输入新密码' }
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              placeholder="请再次输入新密码"
              onChange={e => this.updateState('repassword')(e.target.value)}
            />
          )}
        </FormItem>
        { error && <ErrorMsg error={error} />}
        <FormItem
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 4, offset: 8 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
          >
            确认修改
          </Button>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(PasswdView);


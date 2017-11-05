import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import { Card, Form, Input, Button, Icon } from 'antd';

import updateState from 'Mixins/updateState';

const FormItem = Form.Item;

const ErrorMsg = ({ error }) => (
  <p style={{ marginTop: -20, textAlign: 'center', color: 'red', lineHeight: '30px' }}>
    {error}
  </p>
)
@reactMixin.decorate(updateState)
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username || '',
      password: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateState = this.updateState.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const self = this
    const { form, login } = self.props
    form.validateFields((err) => {
      if (!err) {
        const { username, password } = self.state
        login(username, password)
      }
    })
  }
  render() {
    const { loading, error } = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ margin: '200px auto', width: 420 }}>
        <h2 style={{ fontSize: 24, lineHeight: '50px' }}>请登录</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入用户名' }
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Username"
                onChange={e => this.updateState('username')(e.target.value)}
              />
            )}
          </FormItem>
          <FormItem
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' }
              ],
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                placeholder="请输入密码"
                onChange={e => this.updateState('password')(e.target.value)}
              />
            )}
          </FormItem>
          { error && <ErrorMsg error={error} />}
          <FormItem>
            <Button
              disabled={loading}
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(LoginView);


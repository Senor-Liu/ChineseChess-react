import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './Login.less';

class Login extends Component {
  login = () => {
    this.props.history.push('/main');
  }

  singlePlayer = () => {
    this.props.history.push('/main');
  }

  render() {
    return (
      <div className={styles.from}>
        <h1 style={{ fontFamily: 'STXingkai' }}>中国象棋</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button htmlType="button" onClick={this.singlePlayer}>
              单人游戏
            </Button>
            <Button type="primary" htmlType="submit" onClick={this.login}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
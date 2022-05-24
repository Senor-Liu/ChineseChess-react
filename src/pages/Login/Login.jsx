import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './Login.less';

class Login extends Component {
  onFinish = (values) => {
    console.log('Success:', values);
    this.props.history.push('/main', { username: values.username });
  };

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
          autoComplete="off"
        >
          <Form.Item
            label="用户名："
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input />
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
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
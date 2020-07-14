import React from "react";
import "./index.scss";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

class Auth extends React.Component {
  // 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
  handleOnFinish = (info) => {
    this.props.onFinish(info);
  };
  render() {
    const { loginText, registerText } = this.props;
    return (
      <div className="container">
        <Form
          name="normal_login"
          className="login-form"
          onFinish={this.handleOnFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div className="login-form-button-wrapper">
              <Button
                shape="round"
                type="primary"
                block={true}
                htmlType="submit"
                className="login-form-button"
              >
                {loginText}
              </Button>
            </div>
            <div className="register-button-wrapper">
              <Link to="/register" className="register-button">
                {registerText}
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Auth;

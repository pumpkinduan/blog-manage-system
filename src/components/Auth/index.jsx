import React from "react";
import "./index.scss";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

/**
 * 该组件(傻瓜组件)思想为:
 * 接受props传递来的数据进行展示，这里不做业务逻辑处理
 */

// 密码包含 数字,英文,字符中的两种以上，长度6-20
const pwdReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;

// 用户名至少包含 中文，数字和英文中的一种，且数字不能开头，长度4-12
const usernameReg = /^(?![0-9])[\u4e00-\u9fa5_a-zA-Z0-9_]/;
const validateMessages = {
  string: {
    min: "字符个数不得少于${min}个",
    max: "字符个数不得大于${max}个",
  },
};

class Auth extends React.Component {
  // 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
  handleOnFinish = (info) => {
    this.props.onFinish(info);
  };
  render() {
    const {
      loginText,
      registerText,
      showConfirmInput,
      error,
      onChange,
    } = this.props;
    return (
      <div className="container">
        <Form
          validateMessages={validateMessages}
          name="normal_login"
          className="login-form"
          onFinish={this.handleOnFinish}
        >
          <Form.Item
            name="username"
            // 这里的字段要用exact而非help，避免清空input时无法显示 <请输入您的用户名> 提示文字
            extra={error}
            // validateStatus取值为undefined时才会采用默认的校验规则，不符合规则则会显示标红边框
            validateStatus={error ? "error" : undefined}
            rules={[
              { required: true, message: "请输入您的用户名" },
              {
                pattern: usernameReg,
                message: "至少包含中文，数字或英文中的一种，数字不能开头",
              },
              { min: 4 },
              { max: 12 },
            ]}
          >
            <Input
              onChange={onChange}
              autoComplete="off"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            extra={error}
            validateStatus={error ? "error" : undefined}
            rules={[
              { required: true, message: "请输入您的密码" },
              {
                pattern: pwdReg,
                message: "密码包含 数字,英文,字符中的两种以上",
              },
              { min: 6 },
              { max: 20 },
            ]}
          >
            <Input.Password
              onChange={onChange}
              autoComplete="off"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              allowClear
            />
          </Form.Item>
          {showConfirmInput ? (
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "请确认您的密码",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("两次密码不一致，请重新输入!");
                  },
                }),
              ]}
            >
              <Input.Password
                allowClear
                autoComplete="off"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Comfirm Password"
              />
            </Form.Item>
          ) : (
            ""
          )}

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
              {/* 这里不用Link组件，在第一次点击跳转时会有闪烁的bug */}
              {!showConfirmInput ? (
                <a href="/register" className="register-button">
                  没有账号？{registerText}
                </a>
              ) : (
                <a href="/login" className="login-button">
                  已有账号？ {loginText}
                </a>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Auth;

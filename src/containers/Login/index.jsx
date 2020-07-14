import React from "react";
import { setLocalStorage } from "../../utils/index";
import Auth from "../../components/Auth/index";
class NormalLoginForm extends React.Component {
  // 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }
  onFinish = (info) => {
    setLocalStorage("auth_token", info);
    setLocalStorage("isAuthencated", true);
    setTimeout(() => {
      this.setState({ hidden: false });
      this.props.history.push("/");
    }, 8000);
  };
  render() {
    return (
      <div>
          <Auth
            loginText="现在登录"
            registerText="立即注册"
            onFinish={this.onFinish}
          />
      </div>
    );
  }
}

export default NormalLoginForm;

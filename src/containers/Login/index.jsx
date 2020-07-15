import React from "react";
import { setLocalStorage } from "../../utils/index";
import Auth from "../../components/Auth/index";
import store from "../../redux/store";
import { showGlobalLoading } from "../../redux/actionCreators/index";
class NormalLoginForm extends React.Component {
  // 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
  constructor(props) {
    super(props);
    this.state = {
      helper: "",
    };
  }
  onChange = (e) => {
    // 第一次密码输入错误，会显示错误样式，重新输入密码或账号时，需重置样式
    this.setState({ error: "" });
  };
  onFinish = (info) => {
    // request api
    setLocalStorage("auth_token", info);
    setLocalStorage("isAuthencated", true);
    store.dispatch(showGlobalLoading(true));
    setTimeout(() => {
      store.dispatch(showGlobalLoading(false));
      // this.setState({ error: "密码或账号错误" });
      this.props.history.push("/");
    }, 3000);
  };
  render() {
    return (
      <Auth
        onChange={this.onChange}
        error={this.state.error}
        showConfirmInput={false}
        loginText="现在登录"
        registerText="立即注册"
        onFinish={this.onFinish}
      />
    );
  }
}

export default NormalLoginForm;

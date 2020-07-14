import React from "react";
import Auth from '../../components/Auth/index'
class NormalRegiterForm extends React.Component {
  // 点击注册
  onFinish = (info) => {
    // request api
    console.log(this.props)
    this.props.history.push("/login");
  };
  render() {
    return (
      <Auth loginText="立即注册" onFinish={this.onFinish} />
    );
  }
}

export default NormalRegiterForm;
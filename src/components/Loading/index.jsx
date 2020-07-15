import React, { PureComponent } from "react";
import "./index.scss";
import { Spin } from "antd";
import { connect } from "react-redux";
class Loading extends PureComponent {
  render() {
    // 控制loading的显示与隐藏
    let { loadingStatus } = this.props;
    return (
      <Spin
        className="loading-container"
        delay={200}
        spinning={loadingStatus}
        size="large"
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loadingStatus: state.globalLoading.loadingStatus,
  };
};
export default connect(mapStateToProps)(Loading);

import React, { PureComponent } from "react";
import "./index.scss";
import { Spin } from "antd";
import { connect } from "react-redux";
class Loading extends PureComponent {
  render() {
    let { loadingStatus } = this.props;
    return (
      <div
        className="loading-container"
        style={{ visibility: loadingStatus ? "visible" : "hidden" }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
export default connect()(Loading);

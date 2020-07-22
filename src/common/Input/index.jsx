import React from "react";
import { Input } from "antd";
import "./index.scss";
class CutomInput extends React.PureComponent {
  render() {
    const { prefix = "", placeholder, width = "100%", onChange } = this.props;
    return (
      <div className="custom-input" style={{ width: width }}>
        <Input
          onChange={onChange}
          autoFocus={true}
          placeholder={placeholder}
          prefix={prefix}
          className="override-ant-input-affix-wrapper"
        />
      </div>
    );
  }
}
export default CutomInput;

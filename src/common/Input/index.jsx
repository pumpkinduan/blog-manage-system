import React from "react";
import { Input } from "antd";
import "./index.scss";
const CutomInput = (props) => {
  const { prefix = "", placeholder, width = "100%", onChange } = props;
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
};
export default CutomInput;

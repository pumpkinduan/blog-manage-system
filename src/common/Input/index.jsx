import React from "react";
import { Input } from "antd";
import "./index.scss";
const CutomInput = (props) => {
  const { prefix = "", placeholder } = props;
  return (
    <div className="custom-input">
      <Input
        autoFocus={true}
        placeholder={placeholder}
        prefix={prefix}
        className="override-ant-input-affix-wrapper"
      />
    </div>
  );
};
export default CutomInput;

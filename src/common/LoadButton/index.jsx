import React from "react";
import { Button, Tooltip } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import "./index.scss";
class CustomButton extends React.PureComponent {
  render() {
    const {
      popTitle = "戳我获取更多噢",
      popPlacement = "left",
      popColor = "#2db7f5",
      onClick = () => null,
      spin = false,
    } = this.props;
    return (
      <Tooltip title={popTitle} placement={popPlacement} color={popColor}>
        <Button
          className="load-btn"
          shape="circle-outline"
          size="large"
          onClick={onClick}
        >
          <Loading3QuartersOutlined spin={spin} style={{ fontSize: "18px" }} />
        </Button>
      </Tooltip>
    );
  }
}
export default CustomButton;

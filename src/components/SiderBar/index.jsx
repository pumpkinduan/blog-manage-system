import { Layout, Menu, Button } from "antd";
import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.scss";
const { SubMenu } = Menu;
const { Sider } = Layout;
class SiderBar extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Sider
        theme="light"
        className="bms-sider"
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="sider-top">
          <h1 className="logo">logo</h1>
          {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button> */}
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
export default SiderBar;

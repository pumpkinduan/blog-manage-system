import { Layout, Menu } from "antd";
import React from "react";
import {
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";
const { SubMenu } = Menu;
const { Sider } = Layout;
class SiderBar extends React.Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div className="wrapper">
        
        <Sider
          theme="light"
          // style={{ width: "250px", flex: "0 0 250px", maxWidth: "300px" }}
          collapsible="true"
          className="override-ant-layout-sider"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <SubMenu key="sub2" icon={<UserOutlined />} title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
            {/* <SubMenu key="sub2" icon={<UserOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu> */}
          </Menu>
        </Sider>
      </div>
    );
  }
}
export default SiderBar;

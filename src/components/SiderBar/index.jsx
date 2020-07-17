import { Layout, Menu } from "antd";
import React from "react";
import { UserOutlined, RadarChartOutlined } from "@ant-design/icons";
import "./index.scss";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

const siderLinks = [
  {
    title: "DashBoard",
    icon: <RadarChartOutlined />,
    path: "/dashboard",
  },
  {
    icon: <UserOutlined />,
    title: "文章管理",
    subSiderLinks: [
      {
        title: "文章列表",
        path: "/articleList",
      },
      {
        title: "文章创建",
        path: "/articleCreate",
      },
    ],
  },
];

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
          collapsible="true"
          collapsedWidth={2}
          className="override-ant-layout-sider"
        >
          <Menu mode="inline">
            {siderLinks.map((item, index) => {
              return item.subSiderLinks ? (
                <SubMenu
                  key={"sub" + index}
                  icon={item.icon}
                  title={item.title}
                >
                  {item.subSiderLinks.map((subItem, subIndex) => {
                    return (
                      <Menu.Item
                        key={subIndex * 3 + 1}
                        onClick={() => {
                          this.props.addTags(subItem.title);
                        }}
                      >
                        <NavLink to={subItem.path}> {subItem.title}</NavLink>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              ) : (
                <Menu.Item
                  icon={item.icon}
                  key={index}
                  onClick={() => {
                    this.props.addTags(item.title);
                  }}
                >
                  <NavLink to={item.path}> {item.title}</NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      </div>
    );
  }
}
export default SiderBar;

import React from "react";
import {
  MessageOutlined,
  ExpandOutlined,
  AliwangwangOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
const navs = [
  {
    title: "pumpkin",
    icon: <AliwangwangOutlined />,
  },
  {
    title: "消息",
    icon: <MessageOutlined />,
  },
  {
    title: "全屏",
    icon: <ExpandOutlined />,
  },
];

const Header = () => {
  return (
    <Layout>
    <header className="bms-header">
      <div className="search-container">
        <span className="seach-icon">
          <SearchOutlined />
        </span>
        <input type="text" />
      </div>
      <ul>
        {navs.map((r, i) => (
          <li key={i}>
            <span>{r.title}</span>
            <span>{r.icon}</span>
          </li>
        ))}
      </ul>
    </header>
    </Layout>
  );
};
export default Header;

import React from "react";
import {
  SearchOutlined,
  DownOutlined,
  MessageOutlined,
  ExpandOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Link } from "react-router-dom";
import { Input, Popover, Badge, Menu, Dropdown, List, Avatar } from "antd";
import { setFullScreenStatus } from "../../utils/index";
const Header = (props) => {
  const { logout } = props;

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <header className="bms-header">
      <h1 className="top-left">
        <span className="admin">Pumpkin</span>
        <img
          width="50"
          height="50"
          style={{ borderRadius: "50%" }}
          src="http://demo.qfpffmp.cn/cssthemes5/twts_141_PurpleAdmin/images/faces/face1.jpg"
          alt=""
        />
        <Input
          autoFocus={true}
          placeholder="请输入搜索内容"
          prefix={<SearchOutlined />}
          className="override-ant-input-affix-wrapper"
        />
      </h1>
      <ul className="top-right">
        <li>
          <Dropdown
            overlayClassName="override-ant-dropdown"
            placement="bottomRight"
            overlayStyle={{ minWidth: "20%", top: "80px" }}
            overlay={
              <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            }
            trigger={["click"]}
          >
            <Badge count={5} offset={[5]}>
              <Popover content="有人给你留消息啦" placement="bottom">
                <MessageOutlined />
              </Popover>
            </Badge>
          </Dropdown>
        </li>
        <li>
          <Popover content="来新的访啦" placement="bottom">
            <BellOutlined />
          </Popover>
        </li>
        <li>
          <Popover content="全屏展示" placement="bottom">
            <ExpandOutlined onClick={setFullScreenStatus} />
          </Popover>
        </li>
        {/* {navs.map((r, i) => (
          <li key={i}>
            <Badge count={r.flag ? 5 : 0} offset={[5]}>
              <Popover content={r.title} placement="bottom">
                {r.icon}
              </Popover>
            </Badge>
          </li>
        ))} */}
        <li>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">
                  <Link to="/user">个人中心</Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <a href="https://www.pumpkinduan.cn" target="_blank">
                    南瓜之家
                  </a>
                </Menu.Item>
                <Menu.Divider></Menu.Divider>
                <Menu.Item>
                  <span onClick={logout}>退出登录</span>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <div>
              <img
                width="40"
                heigh="40"
                style={{ borderRadius: "50%", marginRight: "10px" }}
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                alt=""
              />
              <span>Pumpkin</span> <DownOutlined />
            </div>
          </Dropdown>
        </li>
      </ul>
    </header>
  );
};
export default Header;

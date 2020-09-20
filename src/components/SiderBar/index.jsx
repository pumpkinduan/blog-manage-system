import { Layout, Menu } from "antd";
import React from "react";
import PropTypes from "prop-types";
import {
	UserOutlined,
	RadarChartOutlined,
	MessageOutlined,
} from "@ant-design/icons";
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
	{
		icon: <MessageOutlined />,
		title: "留言",
		path: "/comment",
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
		const { addTag } = this.props;
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
									{item.subSiderLinks.map(
										(subItem, subIndex) => {
											return (
												<Menu.Item
													key={subIndex * 3 + 1}
													onClick={() => {
														addTag(subItem);
													}}
												>
													<NavLink to={subItem.path}>
														{" "}
														{subItem.title}
													</NavLink>
												</Menu.Item>
											);
										}
									)}
								</SubMenu>
							) : (
								<Menu.Item
									icon={item.icon}
									key={index}
									onClick={() => {
										addTag(item);
									}}
								>
									<NavLink to={item.path}>
										{" "}
										{item.title}
									</NavLink>
								</Menu.Item>
							);
						})}
					</Menu>
				</Sider>
			</div>
		);
	}
}
SiderBar.propTypes = {
	addTag: PropTypes.func.isRequired,
};
export default SiderBar;

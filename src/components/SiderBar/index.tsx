import { Layout, Menu } from 'antd';
import React from 'react';
import {
	UserOutlined,
	RadarChartOutlined,
	MessageOutlined,
	ProfileOutlined
} from '@ant-design/icons';
import './index.scss';
import { NavLink } from 'react-router-dom';
const { SubMenu } = Menu;
const { Sider } = Layout;
interface siderLinkProps {
	id: string;
	title: string;
	icon?: React.ReactNode;
	path: string;
	subSiderLinks?: siderLinkProps[];
}
const siderLinks = [
	{
		id: '1',
		title: 'DashBoard',
		icon: <RadarChartOutlined />,
		path: '/dashboard'
	},
	{
		id: '2',
		icon: <ProfileOutlined />,
		title: '文章管理',
		path: '/article',
		subSiderLinks: [
			{
				id: '21',
				title: '文章列表',
				path: '/articleList'
			},
			{
				id: '22',
				title: '文章创建',
				path: '/postCreator'
			}
		]
	},
	{
		id: '3',
		icon: <MessageOutlined />,
		title: '留言',
		path: '/comment'
	},
	{
		id: '4',
		icon: <UserOutlined />,
		title: '个人中心',
		path: '/personalCenter'
	}
];
interface IProps {
	addTag: (subItem) => void;
	[props: string]: any;
}
class SiderBar extends React.PureComponent<IProps> {
	getActiveItem = (siderLinks: siderLinkProps[] = []) => {
		const pathname = this.props.location?.pathname;
		return siderLinks.find((item) => pathname?.includes(item.path));
	};
	render() {
		const { addTag } = this.props;

		const activeItem = this.getActiveItem(siderLinks);
		const activeSubItem = this.getActiveItem(activeItem?.subSiderLinks);
		const defaultOpenKeys = activeItem && [activeItem.id]; // 展开的下拉项
		const defaultSelectedKeys =
			(activeSubItem && [activeSubItem.id]) || defaultOpenKeys; // 当前选中的项
		console.log('defaultOpenKeys', defaultOpenKeys);
		console.log('defaultSelectedKeys', defaultSelectedKeys);

		return (
			<div className="wrapper">
				<Sider
					theme="light"
					collapsible={true}
					collapsedWidth={2}
					className="override-ant-layout-sider">
					<Menu
						mode="inline"
						defaultOpenKeys={defaultOpenKeys || []}
						defaultSelectedKeys={defaultSelectedKeys || []}>
						{siderLinks.map((item) => {
							return item.subSiderLinks ? (
								<SubMenu
									popupClassName="override-submenu"
									key={item.id}
									icon={item.icon}
									title={item.title}>
									{item.subSiderLinks.map((subItem) => {
										return (
											<Menu.Item
												key={subItem.id}
												onClick={() => {
													addTag(subItem);
												}}>
												<NavLink to={subItem.path}>
													{subItem.title}
												</NavLink>
											</Menu.Item>
										);
									})}
								</SubMenu>
							) : (
								<Menu.Item
									icon={item.icon}
									key={item.id}
									onClick={() => {
										addTag(item);
									}}>
									<NavLink to={item.path}>
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
export default SiderBar;

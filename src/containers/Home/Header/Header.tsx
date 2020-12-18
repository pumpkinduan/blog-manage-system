import React, { useState, useCallback } from 'react';
import {
	SearchOutlined,
	DownOutlined,
	MessageOutlined,
	ExpandOutlined,
	BellOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import {
	Popover,
	Badge,
	Menu,
	Dropdown,
	List,
	Avatar,
	Button,
	Row,
	Col,
} from 'antd';
import { setFullScreenStatus, createRandomColor } from 'utils';
import CustomInput from 'common/Input';
import { useSelector } from 'react-redux';
import { StoreStateType } from 'redux/reducers';
import { MessageList } from './MessageList';
import './style.scss';
export const Header = () => {
	const history = useHistory();
	const adminInfo = useSelector(
		(storeState: StoreStateType) => storeState.adminInfo
	);
	// 留言消息数据
	let [data, setData] = useState([
		{
			title: '小屁@了你：',
			content: '你好啊，我是测试小哥，文章写得不错哦',
			src:
				'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			createdAt: '3 days ago',
			read: false,
		},
		{
			title: '粉粉回复了你',
			content: '期待更新！！！',
			src:
				'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			createdAt: '5 days ago',
			read: false,
		},
		{
			title: '大先生',
			content: '你好啊，博客好漂亮啊',
			src:
				'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			createdAt: '6 days ago',
			read: false,
		},
		{
			title: '好好先生',
			content: '大佬嘛，哈哈',
			src: '',
			createdAt: '3年前',
			read: false,
		},
	]);
	let [visitorCounts, setVisitorCounts] = useState(5);
	let [commentCounts, setCommentCounts] = useState(50);
	let [visible, setVisible] = useState(false);

	// 控制下拉框的显示与否
	const handleVisibleChange = (flag) => {
		setVisible(flag);
	};
	const clearVisitorCounts = () => setVisitorCounts(0);
	const onClearCommentMsg = () => {
		// 清空留言数
		setCommentCounts(0);

		// 留言数据清空时的显示状态
		setData([
			{
				title: '你真棒',
				content: '已经读完所有消息啦',
				createdAt: '',
				src: '',
				read: true,
			},
		]);
	};

	const onReadOneComment = (e) => {
		let classList = e.currentTarget.classList;
		if (!classList.contains('ant-list-item-read')) {
			setCommentCounts(commentCounts - 1); // 读完一条消息，消息数量减1
			classList.add('ant-list-item-read');
		}
	};
	const logout = useCallback(() => {
		localStorage.removeItem('accessToken');
		history.replace('/login');
	}, []);

	return (
		<Row align="middle" className="override-ant-row">
			<Col flex={1} className="ant-col-left">
				<h1>
					<span className="admin">{adminInfo.username}</span>
					<img
						className="avatar"
						src="http://demo.qfpffmp.cn/cssthemes5/twts_141_PurpleAdmin/images/faces/face1.jpg"
						alt=""
					/>
				</h1>
			</Col>
			<Col className="ant-col-middle" flex={8}>
				<CustomInput
					width="25%"
					placeholder="请输入搜索内容"
					prefix={<SearchOutlined />}
				/>
			</Col>
			<Col className="ant-col-right" flex={1}>
				<nav>
					<Dropdown
						visible={visible}
						onVisibleChange={handleVisibleChange}
						overlayClassName="override-ant-dropdown"
						placement="bottomRight"
						trigger={['click']}
						overlay={
							<MessageList
								dataSource={data}
								onClearCommentMsg={onClearCommentMsg}
								onReadOneComment={onReadOneComment}
							/>
						}>
						<Badge dot count={commentCounts}>
							<Popover
								content={
									commentCounts
										? `新增${commentCounts}条消息`
										: '暂无消息'
								}
								placement="bottomRight">
								<MessageOutlined />
							</Popover>
						</Badge>
					</Dropdown>
				</nav>
				<nav onClick={clearVisitorCounts}>
					<Badge count={visitorCounts} dot>
						<Popover
							content={
								visitorCounts
									? `新增${visitorCounts}位访客`
									: '暂无新增访客'
							}
							placement="bottom">
							<BellOutlined />
						</Popover>
					</Badge>
				</nav>
				<nav>
					<Popover content="全屏展示" placement="bottom">
						<ExpandOutlined onClick={setFullScreenStatus} />
					</Popover>
				</nav>
				<nav>
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item key="0">
									<Link to="/user">个人中心</Link>
								</Menu.Item>
								<Menu.Item key="1">
									<a href="https://www.pumpkinduan.cn">
										南瓜之家
									</a>
								</Menu.Item>
								<Menu.Divider></Menu.Divider>
								<Menu.Item>
									<span onClick={logout}>退出登录</span>
								</Menu.Item>
							</Menu>
						}
						trigger={['click']}>
						<div>
							<img
								className="avatar-small"
								src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
								alt=""
							/>
							<span>{adminInfo.username}</span> <DownOutlined />
						</div>
					</Dropdown>
				</nav>
			</Col>
		</Row>
	);
};

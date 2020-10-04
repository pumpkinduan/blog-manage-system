import React, { PureComponent } from "react";
import { Tabs, List, Tag, Space } from "antd";
import { articleProps } from "types/Article";
import {
	TeamOutlined,
	LikeOutlined,
	CommentOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { STATUS, status } from "types/Article";
import { Moments, Settings } from "components/PersonalCenter";
const { TabPane } = Tabs;
const { Item } = List;
const { Meta } = Item;
const listData: articleProps[] = [];
const listItem: articleProps = {
	id: 12,
	coverUrl:
		"https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
	title: "你好啊，欢迎学习React技术全家桶",
	comments: 123,
	createdAt: "3天前",
	likes: 1235,
	visitors: 123,
	description:
		"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
	status: "published",
	content: "content",
	tags: ["react", "nodeJs"],
	downloads: 11,
	author: "pumpkin",
};
for (let i = 0; i < 5; i++) {
	listData.push(listItem);
}
const Tags = ({ tags }) => tags.map((tag) => <Tag color="purple">{tag}</Tag>);
const IconText = ({ icon, text }) => (
	<Space>
		{icon}
		{text}
	</Space>
);
class personalCenter extends PureComponent {
	createStatusText = (status: status) => {
		if (status === STATUS.PUBLISHED) return `发布该文章`;
		if (status === STATUS.UPDATED) return `更新该文章`;
		if (status === STATUS.DRAFTED) return `存至草稿`;
		if (status === STATUS.DELETED) return `删除该文章`;
	};
	render() {
		return (
			<Tabs defaultActiveKey="1">
				<TabPane tab="个人动态" key="1">
					<Moments />
				</TabPane>
				<TabPane tab="个人设置" key="2">
					<Settings />
				</TabPane>
			</Tabs>
		);
	}
}
export default personalCenter;

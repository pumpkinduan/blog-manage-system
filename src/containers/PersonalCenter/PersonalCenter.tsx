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
	description: "description",
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
					<List
						className="comment-list-item"
						itemLayout="vertical"
						size="large"
						dataSource={listData}
						renderItem={(item) => (
							<Item
								key={item.id}
								actions={[
									<IconText
										icon={<LikeOutlined />}
										text={item.likes}
									/>,
									<IconText
										icon={<CommentOutlined />}
										text={item.comments}
									/>,
									<IconText
										icon={<TeamOutlined />}
										text={item.visitors}
									/>,
									<IconText
										icon={<UploadOutlined rotate={180} />}
										text={item.downloads}
									/>,
								]}
							>
								<Meta
									description={<Tags tags={item.tags} />}
									title={
										<Link to={`/articleCreate/${item.id}`}>
											{item.title}
										</Link>
									}
								/>
								<>
									<section style={{ marginBottom: "10px" }}>
										{item.description}
									</section>
									<p>
										<b className="author">{item.author}</b>
										<Tag color="volcano">
											{item.createdAt}
										</Tag>
										{this.createStatusText(item.status)}
									</p>
								</>
							</Item>
						)}
					/>
				</TabPane>
				<TabPane tab="个人设置" key="2">
					个人设置
				</TabPane>
			</Tabs>
		);
	}
}
export default personalCenter;

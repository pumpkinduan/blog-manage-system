import React from "react";
import { List, Avatar, Space, Collapse } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import ListCard from "components/ArticleList";
import { listItemInterface } from "types/Article";
import "./index.scss";
export interface replyItemProps {
	avatar: string;
	content: string;
	created_at: string;
}
export interface commentItemProps {
	avatar: string;
	name: string;
	article_title: string;
	article_cover: string;
	content: string;
	created_at: string;
	replys: replyItemProps[];
}
const { Panel } = Collapse;
const { Item } = List;
const { Meta } = Item;
const listData: commentItemProps[] = [];
for (let i = 0; i < 5; i++) {
	listData.push({
		name: "hhhhh",
		article_title: `ant design part ${i}`,
		avatar:
			"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		content: "hello",
		created_at: "3 days ago",
		article_cover:
			"https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
		replys: [],
	});
}
const listItem: listItemInterface = {
	id: 12,
	coverUrl:
		"https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
	title: "你好啊，欢迎学习React技术全家桶",
	comments: 123,
	createdAt: "3天前",
	likes: 1235,
	visitors: 123,
};
const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);
const CommentListItem = () => {
	return (
		<List
			className="comment-list-item"
			itemLayout="vertical"
			size="large"
			dataSource={listData}
			renderItem={(item) => (
				<Item
					key={item.article_title}
					actions={[
						<IconText
							icon={MessageOutlined}
							text="2"
							key="list-vertical-message"
						/>,
					]}
					extra={
						<div className="extra-item">
							<ListCard listItem={listItem} />
						</div>
						// <div className="extra-item">
						// 	<span className="article-title">
						// 		{item.article_title}
						// 	</span>
						// 	<img
						// 		width={272}
						// 		alt="logo"
						// 		src={item.article_cover}
						// 	/>
						// </div>
					}
				>
					<Meta
						avatar={<Avatar src={item.avatar} />}
						title={<p>{item.name}</p>}
					/>
					{item.content}
				</Item>
			)}
		/>
	);
};
export default CommentListItem;

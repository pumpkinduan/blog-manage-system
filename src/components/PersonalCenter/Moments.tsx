import React, { PureComponent } from "react";
import { List, Tag, Space } from "antd";
import { articleProps } from "types/Article";
import {
	TeamOutlined,
	LikeOutlined,
	CommentOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { STATUS, status } from "types/Article";
const { Item } = List;
const { Meta } = Item;
const listData: articleProps[] = [];

for (let i = 1; i < 5; i++) {
	const listItem: articleProps = {
		id: i,
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
	listData.push(listItem);
}
const Tags = ({ tags }) =>
	tags.map((tag) => (
		<Tag key={tag} color="purple">
			{tag}
		</Tag>
	));
const IconText = ({ icon, text }) => (
	<Space>
		{icon}
		{text}
	</Space>
);
export const Moments = () => {
	const createStatusText = (status: status) => {
		if (status === STATUS.PUBLISHED) return `发布该文章`;
		if (status === STATUS.UPDATED) return `更新该文章`;
		if (status === STATUS.DRAFTED) return `存至草稿`;
		if (status === STATUS.DELETED) return `删除该文章`;
	};
	return (
		<List
			className="comment-list-item"
			itemLayout="vertical"
			dataSource={listData}
			renderItem={(item) => (
				<Item
					key={item.id}
					actions={[
						<IconText icon={<LikeOutlined />} text={item.likes} />,
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
							<Link
								to={{
									pathname: "articleCreate",
									state: { id: item.id },
								}}
							>
								{item.title}
							</Link>
						}
					/>
					<>
						<section style={{ marginBottom: "10px" }}>
							{item.description}
						</section>
						<p style={{ fontSize: "12px" }}>
							<b className="author">{item.author}</b>
							<Tag color="volcano">{item.createdAt}</Tag>
							{createStatusText(item.status)}
						</p>
					</>
				</Item>
			)}
		/>
	);
};

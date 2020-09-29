import React from 'react';
import { List, Avatar } from 'antd';
import ListCard from 'components/ArticleList';
import { listItemInterface } from 'types/Article';
import { replyItemProps, commentItemProps } from 'types/Comment';
import IconReplyBtn from './IconReplyBtn';
import { CloseOutlined } from '@ant-design/icons';
import './index.scss';
const { Item } = List;
const { Meta } = Item;
const listData: commentItemProps[] = [];
const replys: replyItemProps[] = [];
for (let i = 1; i < 15; i++) {
	replys.push({
		name: 'Jack',
		id: i,
		avatar:
			'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: 'pumpkin, hi',
		created_at: i + 'days ags',
	});
}
for (let i = 0; i < 5; i++) {
	listData.push({
		id: i,
		name: 'hhhhh',
		article_title: `ant design part ${i}`,
		avatar:
			'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: 'hello',
		created_at: '3 days ago',
		article_cover:
			'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
		replys: replys,
	});
}
const listItem: listItemInterface = {
	id: 12,
	coverUrl:
		'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
	title: '你好啊，欢迎学习React技术全家桶',
	comments: 123,
	createdAt: '3天前',
	likes: 1235,
	visitors: 123,
};
const Title = ({ name }) => (
	<div className="title-wrapper">
		<span className="title">{name}</span>
		<CloseOutlined className="delete-icon" />
	</div>
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
						<IconReplyBtn item={item} count={item.replys.length} />,
					]}
					extra={
						<div className="extra-item">
							<ListCard listItem={listItem} />
						</div>
					}
				>
					<Meta
						description={item.created_at}
						avatar={<Avatar src={item.avatar} />}
						title={<Title name={item.name} />}
					/>
					{item.content}
				</Item>
			)}
		/>
	);
};
export default CommentListItem;

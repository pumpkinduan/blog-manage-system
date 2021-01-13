import React, { useEffect, useState } from 'react';
import { List, Tag, Space } from 'antd';
import { TeamOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { STATUS, PostStatus, BasicPost } from 'interfaces/post.interface';
import { getPostLists } from 'core/apis';
import dayjs from 'dayjs';

const { Item } = List;
const { Meta } = Item;

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
	const [dataSource, setDatasouce] = useState<BasicPost[]>([]);

	useEffect(() => {
		const requestData = async () => {
			const dataSource = await getPostLists();
			setDatasouce(dataSource.data);
		};
		requestData();
	}, []);
	const createStatusText = (status: PostStatus) => {
		if (status === STATUS.PUBLISHED) return `发布该文章`;
		if (status === STATUS.UPDATED) return `更新该文章`;
		if (status === STATUS.DRAFTED) return `存至草稿`;
		if (status === STATUS.DELETED) return `删除该文章`;
	};

	return (
		<List
			itemLayout="vertical"
			dataSource={dataSource}
			renderItem={(item) => (
				<Item
					key={item.id}
					actions={[
						<IconText icon={<LikeOutlined />} text={item.likes} />,
						<IconText
							icon={<CommentOutlined />}
							text={item.totalComments}
						/>,
						<IconText
							icon={<TeamOutlined />}
							text={item.browsers}
						/>,
					]}>
					<Meta
						description={<Tags tags={item.tags} />}
						title={
							<Link
								to={{
									pathname: 'articleCreate',
									state: { id: item.id },
								}}>
								{item.title}
							</Link>
						}
					/>
					<>
						<section style={{ marginBottom: '10px' }}>
							{item.description}
						</section>
						<p style={{ fontSize: '12px' }}>
							<b className="author">{item.author}</b>
							<Tag color="volcano">
								{dayjs(item.createdAt).fromNow()}
							</Tag>
							{createStatusText(item.status)}
						</p>
					</>
				</Item>
			)}
		/>
	);
};

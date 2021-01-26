import React, { useEffect, useState, useRef } from 'react';
import { List, Tag, Space, Spin } from 'antd';
import { TeamOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { STATUS, PostStatus, BasicPost } from 'interfaces/post.interface';
import { getPostLists } from 'core/apis';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
const { Item } = List;
const { Meta } = Item;

const Wrapper = styled.div`
	overflow: auto;
	height: ${(props: { height: number }) => props.height + 'px'};
`;

const Footer = styled.footer`
	color: #ddd;
	font-size: 14px;
`;

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
	const ref = useRef<{ page: number }>({ page: 1 });
	const [dataSource, setDatasouce] = useState<BasicPost[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const requestData = async (page = 1) => {
		const result = await getPostLists({ page, pageSize: 5 });
		if (result.data.length < 5) {
			setHasMore(false);
		}
		setLoading(false);
		setDatasouce((dataSource) => [...dataSource, ...result.data]);
	};

	useEffect(() => {
		requestData();
	}, []);
	const createStatusText = (status: PostStatus) => {
		if (status === STATUS.PUBLISHED) return `发布该文章`;
		if (status === STATUS.UPDATED) return `更新该文章`;
		if (status === STATUS.DRAFTED) return `存至草稿`;
		if (status === STATUS.DELETED) return `删除该文章`;
	};

	const handleLoadMore = () => {
		setLoading(true);
		requestData(++ref.current.page);
	};
	return (
		<Wrapper height={window.innerHeight - 100 - 44 - 46 - 60}>
			<InfiniteScroll
				initialLoad={false}
				pageStart={0}
				loadMore={handleLoadMore}
				hasMore={!loading && hasMore}
				useWindow={false}>
				<Spin spinning={loading} delay={300}>
					<List
						itemLayout="vertical"
						dataSource={dataSource}
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
				</Spin>
			</InfiniteScroll>
			{dataSource.length !== 0 && (
				<Footer>
					已获取了{dataSource.length}条动态，貌似没有了哦!
				</Footer>
			)}
		</Wrapper>
	);
};

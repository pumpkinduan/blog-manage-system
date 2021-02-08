import React, { useState, useEffect } from 'react';
import { Col, Row, message } from 'antd';
import { ListCard } from './components/ListCard';
import LoadButton from 'common/LoadButton';
import QueueAnim from 'rc-queue-anim';
import { PostInterface } from 'interfaces/index.interface';
import { getPostLists } from 'core/apis';
import './style.scss';
const PostList = () => {
	const [spin, setSpin] = useState(false);
	const [page, setPage] = useState(1);
	const [dataSource, setDataSource] = useState<PostInterface.BasicPost[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);

	useEffect(() => {
		const requestData = async () => {
			const result = await getPostLists({ page: page });
			setDataSource((dataSource) => dataSource.concat(result.data));
			setSpin(false);
			if (result.data.length < 10) {
				setHasMore(false);
			}
		};
		requestData();
	}, [page]);

	const loadMoreData = () => {
		if (!hasMore) return;
		setSpin(true);
		setPage((page) => page + 1);
	};

	return (
		<div className="article-list-container">
			<Row align="middle" gutter={[12, 15]}>
				{dataSource.map((item, index: number) => {
					return (
						<Col
							xxl={{ span: 6 }}
							md={{ span: 8 }}
							key={item.createdAt}>
							<QueueAnim
								type="bottom"
								interval={100}
								delay={index * 100}>
								<ListCard
									key={item.id}
									listItem={item}
									onOk={() => {
										setDataSource((dataSource) => {
											const deep = [...dataSource];
											deep.splice(index, 1);
											return deep;
										});
										message.success('删除成功');
									}}
								/>
							</QueueAnim>
						</Col>
					);
				})}
			</Row>
			{!hasMore && dataSource.length !== 0 && (
				<footer style={{ color: '#ddd' }}>
					已获取了{dataSource.length}篇文章，貌似没有了哦!
				</footer>
			)}
			<LoadButton
				spin={spin}
				popTitle="戳我获取更多噢~"
				popPlacement="left"
				popColor="#2db7f5"
				onClick={loadMoreData}
			/>
		</div>
	);
};
export default PostList;

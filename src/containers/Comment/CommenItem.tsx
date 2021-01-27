import React, { useEffect, useCallback, useRef, useState } from 'react';
import { List, Avatar, Modal, message, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { deleteComments, getComments } from 'core/apis';
import { BasicComment, COMMENT_TYPE } from 'interfaces/comment.interface';
import IconReplyBtn from './IconReplyBtn';
import dayjs from 'dayjs';
import './style.scss';
import { MyInfiniteScroll } from 'components/MyInfiniteScroll';
const { Item } = List;
const { Meta } = Item;

export const CommentItem = () => {
	const ref = useRef<{ page: number }>({ page: 1 });
	const [dataSource, setDatasouce] = useState<BasicComment[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const requestData = useCallback(
		async (page = 1, cb: (data: BasicComment[]) => void) => {
			const result = await getComments({
				type: COMMENT_TYPE.POST,
				pageSize: 15,
				page,
			});
			if (result.data.length < 15) {
				setHasMore(false);
			}
			setLoading(false);
			cb(result.data);
		},
		[]
	);
	useEffect(() => {
		requestData(1, (data) => {
			setDatasouce(data);
		});
	}, []);
	const deleteSelectedComment = (id: string, index: number) => {
		Modal.confirm({
			content: '您确定要删除该留言嘛?',
			onOk: async () => {
				await deleteComments(id);
				const deep = [...dataSource];
				deep.splice(index, 1);
				setDatasouce(deep);
				message.success('删除成功');
			},
		});
	};
	const handleLoadMore = () => {
		setLoading(true);
		requestData(++ref.current.page, (data) => {
			setDatasouce((dataSource) => dataSource.concat(data));
		});
	};
	return (
		<MyInfiniteScroll
			height={window.innerHeight - 100 - 46 - 40}
			loadMore={handleLoadMore}
			loading={loading}
			hasMore={hasMore}
			totalCounts={dataSource.length}>
			<List
				className="comment-list-item"
				itemLayout="vertical"
				size="large"
				dataSource={dataSource}
				renderItem={(item, index) => (
					<Item
						key={item.id}
						actions={[
							<Row align="middle" gutter={12}>
								<Col className="fs-12">
									{dayjs(item.createdAt).fromNow()}
								</Col>
								<Col>
									<IconReplyBtn
										item={item}
										onOk={() => {
											requestData(1, (data) => {
												setDatasouce(data);
											});
										}}
									/>
								</Col>
								<Col>
									<CloseOutlined
										className="delete-icon"
										onClick={() => {
											deleteSelectedComment(
												item.id,
												index
											);
										}}
									/>
								</Col>
							</Row>,
						]}>
						<Meta
							// description={{}}
							avatar={
								item.sourceUser.avatar ? (
									<Avatar src={item.sourceUser.avatar} />
								) : (
									<Avatar
										style={{
											background: '#f9f0ff',
											color: '#666',
											border: '1px solid #d3adf7',
										}}>
										{item.sourceUser.username[0]}
									</Avatar>
								)
							}
							title={
								<div className="title-wrapper">
									<span className="title">
										{item.sourceUser.username}
									</span>
								</div>
							}
						/>
						{item.content}
					</Item>
				)}
			/>
		</MyInfiniteScroll>
	);
};

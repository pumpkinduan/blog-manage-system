import { message, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { BaseTable } from 'components/CutomTable';
import FooterControl from 'containers/Comment/FooterControl';
import { getPostLists } from 'core/apis';
import dayjs from 'dayjs';
import { PostInterface } from 'interfaces/index.interface';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
const PostDrafts = () => {
	const [dataSource, setDataSource] = useState<PostInterface.BasicPost[]>([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0
	});
	const [visibleFooter, setVisibleFooter] = useState(false);
	const [selectedRows, setSelectedRows] = useState<PostInterface.BasicPost[]>(
		[]
	);

	const requestData = useCallback(async (current = 1) => {
		const result = await getPostLists({
			page: current,
			pageSize: pagination.pageSize
		});
		setPagination({ ...pagination, current, total: result.sum });
		setDataSource(
			result.data.filter((post) => {
				// return post.status === PostInterface.STATUS.DRAFTED;
				return true;
			})
		);
	}, []);
	useEffect(() => {
		requestData();
	}, []);

	const controlVisibleFooter = (selectedRowkeys) => {
		if (selectedRowkeys.length > 0) return setVisibleFooter(true);
		setVisibleFooter(false);
	};
	// 删除所选的回复
	const handleOnDelete = async () => {
		// await deleteComments(selectedRows.map((data) => data.id).join(','));
		setVisibleFooter(false);
		message.success('删除成功');
		await requestData();
	};

	const rowSelection = {
		onChange: (
			selectedRowkeys: (string | number)[],
			selectedRows: PostInterface.BasicPost[]
		) => {
			controlVisibleFooter(selectedRowkeys);
			setSelectedRows(selectedRows);
		}
	};
	const columns: ColumnsType<PostInterface.BasicPost> = [
		{
			title: 'Title',
			dataIndex: 'title',
			render: (text, record) => (
				<Link
					to={{
						pathname: `postCreator/${record.id}`,
						state: { isEdited: true, postId: record.id }
					}}>
					{record.title}
				</Link>
			)
		},
		{
			width: '36%',
			title: 'Description',
			dataIndex: 'description',
			render: (text) => (
				<p
					className="ellipsis"
					style={{ maxWidth: '300px' }}
					title={text}>
					{text}
				</p>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text: string) => (
				<Tag color="orange"> {text.toLocaleUpperCase()} </Tag>
			)
		},
		{
			title: 'Created',
			dataIndex: 'createdAt',
			render: (text) => <Tag color="pink">{dayjs(text).fromNow()}</Tag>
		}
	];
	return (
		<BaseTable
			onChange={(_pagination) => {
				requestData(_pagination.current);
			}}
			dataSource={dataSource}
			columns={columns}
			rowSelection={rowSelection}
			pagination={pagination}
			footer={() => (
				<FooterControl
					selectedCount={selectedRows.length}
					onOk={handleOnDelete}
					visible={visibleFooter}
				/>
			)}
		/>
	);
};
export default PostDrafts;

import React, { useCallback, useEffect, useState } from 'react';
import { BaseTable } from 'components/CutomTable';
import { ColumnType } from 'antd/lib/table';
import FooterControl from '../Comment/FooterControl';
import { message } from 'antd';
import { getComments, deleteComments } from 'core/apis';
import { BasicComment, COMMENT_TYPE } from 'interfaces/comment.interface';
import dayjs from 'dayjs';
export const Words = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 15,
		total: 0
	});
	const [visibleFooter, setVisibleFooter] = useState(false);
	const [dataSource, setDataSource] = useState<BasicComment[]>([]);
	const [selectedRows, setSelectedRows] = useState<BasicComment[]>([]);

	const columns: ColumnType<BasicComment>[] = [
		{
			dataIndex: 'name',
			title: 'Name',
			width: '100px',
			render: (text, record) => record.sourceUser.username
		},

		{
			title: 'ta对你说',
			dataIndex: 'content'
		},
		{
			title: '时间',
			dataIndex: 'created_at',
			width: '100px',
			render: (text, record) => dayjs(record.createdAt).fromNow()
		}
	];

	const requestData = useCallback(async (current = 1) => {
		const res = await getComments({
			type: COMMENT_TYPE.ADMIN,
			page: current,
			pageSize: 15
		});
		setPagination({ ...pagination, current, total: res.sum });
		setDataSource(res.data);
		setSelectedRows([]);
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
		await deleteComments(selectedRows.map((data) => data.id).join(','));
		setVisibleFooter(false);
		message.success('删除成功');
		await requestData();
	};

	const rowSelection = {
		onChange: (
			selectedRowkeys: (string | number)[],
			selectedRows: BasicComment[]
		) => {
			controlVisibleFooter(selectedRowkeys);
			setSelectedRows(selectedRows);
		}
	};
	return (
		<BaseTable
			onChange={(_pagination) => {
				requestData(_pagination.current);
			}}
			pagination={pagination}
			scroll={{
				y:
					window.innerHeight -
					100 -
					46 -
					44 -
					40 -
					(visibleFooter ? 160 : 120)
			}}
			rowSelection={rowSelection}
			dataSource={dataSource}
			columns={columns}
			footer={() => (
				<FooterControl
					visible={visibleFooter}
					onOk={handleOnDelete}
					selectedCount={selectedRows.length}
				/>
			)}
		/>
	);
};

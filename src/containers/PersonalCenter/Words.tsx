import React, { useCallback, useEffect, useState } from 'react';
import { replyItemProps } from 'types/Comment';
import { AdvancedTable } from 'components/CutomTable';
import { SearchInput } from 'components/CutomTable/components';
import { ColumnType } from 'antd/lib/table';
import FooterControl from 'components/Comment/FooterControl';
import { message } from 'antd';
import { getComments, deleteComments } from 'core/apis';
import { BasicComment, COMMENT_TYPE } from 'interfaces/comment.interface';
import dayjs from 'dayjs';
export const Words = () => {
	const [visibleFooter, setVisibleFooter] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [dataSource, setDataSource] = useState<BasicComment[]>([]);
	const [selectedRows, setSelectedRows] = useState<BasicComment[]>([]);

	const columns: ColumnType<BasicComment>[] = [
		{
			dataIndex: 'name',
			title: 'Name',
			width: '100px',
			render: (text, record) => record.sourceUser.username,
		},

		{
			title: 'ta对你说',
			dataIndex: 'content',
		},
		{
			title: '时间',
			dataIndex: 'created_at',
			width: '100px',
			render: (text, record) => dayjs(record.createdAt).fromNow(),
		},
	];

	const requestData = useCallback(async () => {
		const res = await getComments({ type: COMMENT_TYPE.ADMIN });
		setDataSource(res.data);
		setSelectedRows([]);
	}, []);

	useEffect(() => {
		requestData();
	}, [requestData]);
	const controlVisibleFooter = (selectedRowkeys) => {
		if (selectedRowkeys.length > 0) return setVisibleFooter(true);
		setVisibleFooter(false);
	};
	// 删除所选的回复
	const handleOnDelete = async () => {
		await deleteComments(selectedRows.map((data) => data.id).join(','));
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
		},
	};
	let filteredDataSource = dataSource;
	if (searchValue !== '') {
		filteredDataSource = dataSource.filter(
			(data) =>
				data.sourceUser.username.includes(searchValue) ||
				data.content.includes(searchValue)
		);
	}
	return (
		<AdvancedTable
			headerControllerConfig={[
				{
					type: 'search',
					component: (
						<SearchInput
							onSearchChange={(value) => {
								setSearchValue(value);
							}}
						/>
					),
				},
			]}
			rowSelection={rowSelection}
			rowKey={(record: replyItemProps) => record.id}
			dataSource={filteredDataSource}
			columns={columns}
			footer={() => (
				<FooterControl
					visible={visibleFooter}
					deleteSelectedReplys={handleOnDelete}
					selectedCount={selectedRows.length}
				/>
			)}
		/>
	);
};

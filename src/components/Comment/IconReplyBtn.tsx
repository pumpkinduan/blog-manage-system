import React, { useState } from 'react';
import { Badge, Popover, Modal, message } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { replyItemProps, commentItemProps } from 'types/Comment';
import BaseTable from 'common/BaseTable';
import { ColumnType } from 'antd/lib/table';
import FooterControl from './FooterControl';
interface IconTextProps {
	count: number;
	item: commentItemProps;
}
const IconReplyBtn = ({ count, item }: IconTextProps) => {
	const [visible, setVisible] = useState(false);
	const [visibleFooter, setVisibleFooter] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedRows, setSelectedRows] = useState<replyItemProps[]>([]);
	const [selectedRowkeys, setSelectedRowKeys] = useState<(string | number)[]>(
		[]
	);
	const columns: ColumnType<replyItemProps>[] = [
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			width: '160px',
			render: (text: any, record) => record.created_at,
		},
		{
			title: '昵称',
			dataIndex: 'name',
			width: '200px',
			render: (text: any, record) => record.name,
		},
		{
			title: '回复',
			dataIndex: 'reply',
			width: '66%',
			render: (text: any, record) => record.content,
		},
	];
	const controlVisibleFooter = (selectedRowkeys) => {
		if (selectedRowkeys.length > 0) return setVisibleFooter(true);
		setVisibleFooter(false);
	};
	const rowSelection = {
		onChange: (
			selectedRowkeys: (string | number)[],
			selectedRows: replyItemProps[]
		) => {
			controlVisibleFooter(selectedRowkeys);
			setSelectedRows(selectedRows);
			setSelectedRowKeys(selectedRowkeys);
		},
	};
	const showReplyPanel = () => {
		setVisible(true);
	};
	const hideReplyPanel = () => {
		setVisible(false);
	};
	// 搜索
	const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	// 删除所选的回复
	const deleteSelectedReplys = () => {
		message.success('删除成功');
	};
	let replys = item.replys;
	if (searchValue !== '') {
		replys = item.replys.filter(
			(reply) =>
				reply.name.includes(searchValue) ||
				reply.content.includes(searchValue)
		);
	}
	return (
		<>
			{visible && (
				<Modal
					title={
						<>
							@<span className="name">{item.name}</span>的回复
						</>
					}
					width="50%"
					visible={visible}
					onCancel={hideReplyPanel}
					onOk={() => {
						setVisible(false);
					}}
					footer={null}
				>
					<BaseTable
						onSearchChange={searchChange}
						rowKey={(record: replyItemProps) => record.id}
						rowSelection={rowSelection}
						columns={columns}
						dataSource={replys}
						footer={() => (
							<FooterControl
								visible={visibleFooter}
								deleteSelectedReplys={deleteSelectedReplys}
								selectedCount={selectedRowkeys.length}
							/>
						)}
					/>
				</Modal>
			)}

			<Badge dot count={count}>
				<Popover
					content={
						count ? `有${count}条消息@了${item.name}` : '暂无回复'
					}
					placement="bottom"
				>
					<SoundOutlined onClick={showReplyPanel} />
				</Popover>
			</Badge>
		</>
	);
};
export default IconReplyBtn;

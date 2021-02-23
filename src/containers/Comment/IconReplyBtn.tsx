import React, { useState } from 'react';
import { Badge, Popover, Modal, message } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';
import FooterControl from './FooterControl';
import { BasicComment } from 'interfaces/comment.interface';
import dayjs from 'dayjs';
import { AdvancedTable } from 'components/CutomTable';
import { SearchInput } from 'components/CutomTable/components';
import { deleteReplies } from 'core/apis';
interface IconTextProps {
	item: BasicComment;
	onOk: () => void;
}
const IconReplyBtn = ({ item, onOk }: IconTextProps) => {
	const [visible, setVisible] = useState(false);
	const [visibleFooter, setVisibleFooter] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedRowkeys, setSelectedRowKeys] = useState<(string | number)[]>(
		[]
	);
	const columns: ColumnType<BasicComment>[] = [
		{
			title: '昵称',
			dataIndex: 'name',
			width: '200px',
			render: (text, record) => record.sourceUser.username
		},
		{
			title: '回复',
			dataIndex: 'reply',
			render: (text, record) => record.content
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			width: '160px',
			render: (text) => dayjs(text).fromNow()
		}
	];
	const controlVisibleFooter = (selectedRowkeys) => {
		if (selectedRowkeys.length > 0) return setVisibleFooter(true);
		setVisibleFooter(false);
	};
	const rowSelection = {
		onChange: (selectedRowkeys: (string | number)[]) => {
			controlVisibleFooter(selectedRowkeys);
			setSelectedRowKeys(selectedRowkeys);
		}
	};
	const showReplyPanel = () => {
		setVisible(true);
	};
	const hideReplyPanel = () => {
		setVisible(false);
	};
	// 删除所选的回复
	const deleteSelectedReplys = async () => {
		await deleteReplies(selectedRowkeys.join(','));
		message.success('删除成功');
		setVisibleFooter(false);
		setSelectedRowKeys([]);
		onOk();
	};
	let replys = item.replies;
	if (searchValue !== '') {
		replys = item.replies.filter(
			(reply) =>
				reply.sourceUser.username.includes(searchValue) ||
				reply.content.includes(searchValue)
		);
	}
	return (
		<>
			{
				<Modal
					title={
						<>
							@
							<span className="name">
								{item.sourceUser.username}
							</span>
							的回复
						</>
					}
					width="66%"
					visible={visible}
					onCancel={hideReplyPanel}
					onOk={() => {
						setVisible(false);
					}}
					footer={null}>
					<AdvancedTable
						scroll={{
							y: 600
						}}
						pagination={false}
						headerControllerConfig={[
							{
								type: 'search',
								component: (
									<SearchInput
										onSearchChange={(value) => {
											setSearchValue(value);
										}}
									/>
								)
							}
						]}
						dataSource={replys}
						rowSelection={rowSelection}
						columns={columns}
						footer={() => (
							<FooterControl
								visible={visibleFooter}
								onOk={deleteSelectedReplys}
								selectedCount={selectedRowkeys.length}
							/>
						)}></AdvancedTable>
				</Modal>
			}

			<Badge dot count={replys.length}>
				<Popover
					content={
						replys.length
							? `有${replys.length}条消息@了${item.sourceUser.username}`
							: '暂无回复'
					}
					placement="bottom">
					<SoundOutlined onClick={showReplyPanel} />
				</Popover>
			</Badge>
		</>
	);
};
export default IconReplyBtn;

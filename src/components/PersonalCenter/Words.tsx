import React, { useState } from "react";
import BaseTable from "common/BaseTable";
import { replyItemProps } from "types/Comment";
import { ColumnType } from "antd/lib/table";
import FooterControl from "components/Comment/FooterControl";
import { message } from "antd";
export const Words = () => {
	const [visible, setVisible] = useState(false);
	const [visibleFooter, setVisibleFooter] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [selectedRows, setSelectedRows] = useState<replyItemProps[]>([]);
	const [selectedRowkeys, setSelectedRowKeys] = useState<(string | number)[]>(
		[]
	);
	const dataSource: replyItemProps[] = [
		{
			created_at: "3 days ago",
			id: "1",
			name: "Nick",
			avatar: "sfsf",
			content: "hello",
		},
		{
			created_at: "3 days ago",
			id: "2",
			name: "Nick",
			avatar: "sfsf",
			content: "hello",
		},
		{
			created_at: "3 days ago",
			id: "3",
			name: "Nick",
			avatar: "sfsf",
			content: "hello",
		},
	];
	const columns: ColumnType<replyItemProps>[] = [
		{
			dataIndex: "name",
			title: "Name",
			width: "100px",
		},

		{
			title: "ta对你说",
			dataIndex: "content",
		},
		{
			title: "时间",
			dataIndex: "created_at",
			width: "100px",
		},
	];
	const controlVisibleFooter = (selectedRowkeys) => {
		if (selectedRowkeys.length > 0) return setVisibleFooter(true);
		setVisibleFooter(false);
	};
	// 删除所选的回复
	const deleteSelectedReplys = () => {
		message.success("删除成功");
	};
	const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
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
	let replys = dataSource;
	if (searchValue !== "") {
		replys = dataSource.filter(
			(reply) =>
				reply.name.includes(searchValue) ||
				reply.content.includes(searchValue)
		);
	}
	return (
		<BaseTable
			onSearchChange={searchChange}
			rowSelection={rowSelection}
			showSearchInput={true}
			rowKey={(record: replyItemProps) => record.id}
			dataSource={replys}
			columns={columns}
			footer={() => (
				<FooterControl
					visible={visibleFooter}
					deleteSelectedReplys={deleteSelectedReplys}
					selectedCount={selectedRowkeys.length}
				/>
			)}
		/>
	);
};

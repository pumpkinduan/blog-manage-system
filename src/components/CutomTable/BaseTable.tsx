import React from 'react';
import { Table } from 'antd';
import { BaseTableProps } from './types';
import './style.scss';
export const BaseTable = <RecordType extends { id: string }>({
	loading = false,
	...props
}: BaseTableProps) => {
	return (
		<div className="table-container">
			{props.children}
			<div className="table-container-wrapper">
				<Table<RecordType>
					loading={{
						spinning: loading,
						delay: 300,
					}}
					scroll={{
						y: window.innerHeight - 300 - 30,
					}}
					rowKey={(record) => record.id}
					className="override-ant-table"
					showSorterTooltip={false}
					bordered={false}
					{...props}
				/>
			</div>
		</div>
	);
};

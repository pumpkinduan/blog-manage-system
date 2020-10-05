import React from "react";
import { Row, Col, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TableProps } from "antd/lib/table";

import "./index.scss";
export interface BaseTableProps extends TableProps<any> {
	dataSource: any[];
	showSearchInput?: boolean;
	onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
class BaseTable extends React.Component<BaseTableProps> {
	onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		typeof this.props.onSearchChange === "function" &&
			this.props.onSearchChange(e);
	};
	render() {
		const { showSearchInput = true, ...rest } = this.props;
		return (
			<div className="table-container">
				<Row
					align="middle"
					justify="space-between"
					className="header-control"
				>
					<Col span={6}>
						{showSearchInput && (
							<Input
								suffix={
									<SearchOutlined style={{ color: "#999" }} />
								}
								onChange={this.onSearchChange}
								style={{ width: "100%" }}
								placeholder="搜索"
							/>
						)}
					</Col>
				</Row>
				<Table
					className="override-ant-table"
					showSorterTooltip={false}
					rowClassName={() => "editable-row"}
					bordered={false}
					scroll={{ y: 550 }}
					pagination={false}
					{...rest}
				/>
			</div>
		);
	}
}
export default BaseTable;

import React, { useState } from 'react';
import { Button, Row, Col, Modal } from 'antd';
interface IProps {
	selectedCount: number;
	deleteSelectedReplys: () => void;
	visible: boolean;
}
const FooterControl = ({
	selectedCount,
	deleteSelectedReplys,
	visible,
}: IProps) => {
	const handleDelete = () => {
		Modal.confirm({
			content: '您确定要删除所选中的回复嘛?',
			onOk: deleteSelectedReplys,
		});
	};
	return (
		<Row
			align="middle"
			justify="space-between"
			style={{ display: visible ? 'flex' : 'none' }}
		>
			<Col>
				已选中{<span className="count">{selectedCount}</span>}条回复
			</Col>
			<Col>
				<Button
					className="delete-btn"
					type="primary"
					onClick={handleDelete}
				>
					删除
				</Button>
			</Col>
		</Row>
	);
};
export default FooterControl;

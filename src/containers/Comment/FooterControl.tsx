import React from 'react';
import { Button, Row, Col, Modal } from 'antd';
interface IProps {
	selectedCount: number;
	onOk: () => void;
	visible: boolean;
}
const FooterControl = ({ selectedCount, onOk, visible }: IProps) => {
	const handleDelete = () => {
		Modal.confirm({
			content: '您确定要删除所选中的回复嘛?',
			onOk: onOk
		});
	};
	return (
		<Row
			align="middle"
			justify="space-between"
			style={{ display: visible ? 'flex' : 'none' }}>
			<Col>
				已选中{<span className="count">{selectedCount}</span>}条回复
			</Col>
			<Col>
				<Button
					className="delete-btn"
					type="primary"
					onClick={handleDelete}>
					删除
				</Button>
			</Col>
		</Row>
	);
};
export default FooterControl;

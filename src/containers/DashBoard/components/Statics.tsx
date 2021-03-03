import React from 'react';
import { Row, Col } from 'antd';
import './style.scss';
const Statics = (props) => {
	const { data, updateCharts } = props;
	return (
		<Row
			justify="space-between"
			gutter={16}
			className="override-ant-row-component">
			{data.map((item, index) => (
				<Col
					span={5}
					key={index}
					onClick={() => {
						updateCharts(item);
					}}>
					<div className="icon-wrapper">{item.icon}</div>
					<div className="data-wrapper">
						<span>{item.title}</span>
						<strong>{item.counts}</strong>
					</div>
				</Col>
			))}
		</Row>
	);
};
export default Statics;

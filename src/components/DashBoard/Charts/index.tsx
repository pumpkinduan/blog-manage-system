import React from 'react';
import { Row, Col } from 'antd';
import { Line } from '@ant-design/charts';
import './index.scss';
const Charts = (props) => {
	const { data, title } = props;

	// 将x变量对应的字段作为x轴组件所显示的数据
	const [x, y] = Object.keys(data[0]);
	const config = {
		data,
		title: {
			visible: true,
			text: title + '（折线图）',
		},
		description: {
			visible: true,
			text: '加把劲儿 ' + title + ' 就上去啦',
		},
		smooth: true,
		forceFit: true,
		padding: 'auto',
		xField: x,
		yField: y,
		meta: {
			[x]: { alias: '月份' },
			[y]: { alias: '统计数量' },
		},
		interactions: [
			{
				type: 'slider',
				cfg: {
					start: 0,
					end: 1,
				},
			},
		],
	};
	return (
		<Row>
			<Col span={24}>
				<Line {...config} />
			</Col>
		</Row>
	);
};
export default Charts;

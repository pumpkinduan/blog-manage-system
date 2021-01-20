import React from 'react';
import { Row, Col } from 'antd';
import { AdvancedTableProps } from './types';
import { BaseTable } from './BaseTable';

export const AdvancedTable = <D extends { id: string }>({
	headerControllerConfig,
	...props
}: AdvancedTableProps) => {
	return (
		<BaseTable<D> {...props}>
			<Row
				align="middle"
				justify="space-between"
				gutter={16}
				style={{ marginBottom: '10px' }}>
				{headerControllerConfig.map((config, index, _this) => {
					// 最后的controller需要右对齐
					const isLastController = index === _this.length - 1;
					return (
						<Col
							key={index}
							flex={
								isLastController && _this.length !== 1
									? 'auto'
									: 'none'
							}
							style={{
								textAlign: isLastController ? 'right' : 'left',
							}}>
							{config.component}
						</Col>
					);
				})}
			</Row>
		</BaseTable>
	);
};

import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
export const SearchInput = ({
	onSearchChange,
}: {
	onSearchChange?: (value: string) => void;
}) => {
	return (
		<Input
			suffix={<SearchOutlined style={{ color: '#999' }} />}
			onChange={(e) => {
				onSearchChange && onSearchChange(e.target.value);
			}}
			style={{ width: '100%' }}
			placeholder="搜索"
		/>
	);
};

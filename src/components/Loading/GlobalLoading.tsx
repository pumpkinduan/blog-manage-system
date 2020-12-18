import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { StoreStateType } from 'redux/reducers';
import './index.scss';

export const GlobalLoading = () => {
	const globalLoading = useSelector(
		(store: StoreStateType) => store.globalLoading
	);
	return (
		<Spin
			className="loading-container"
			delay={200}
			spinning={globalLoading.status === 'end' ? false : true}
			size="large"
		/>
	);
};

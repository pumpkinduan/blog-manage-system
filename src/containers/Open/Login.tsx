import React, { useCallback } from 'react';
import { login } from 'core/apis';
import { AuthForm, Status } from './components/AuthForm';
export const NormalLoginForm = (props) => {
	// 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
	const onFinish = useCallback(
		async (info) => {
			const res = await login(info);
			localStorage.setItem('accessToken', res.data?.accessToken as any);
			props.history.push('/dashboard');
		},
		[props.history]
	);
	return (
		<AuthForm
			status={Status.Login}
			btnText="现在登录"
			onFinish={onFinish}
		/>
	);
};

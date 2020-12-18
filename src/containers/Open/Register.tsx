import React from 'react';
import { AuthForm, Status } from './components/AuthForm';
import { notification } from 'antd';
import { register } from 'core/apis';
import { UserInterface } from 'interfaces/index.interface';
import { useHistory } from 'react-router-dom';
export const NormalRegiterForm = (props) => {
	const history = useHistory();
	// 点击注册
	const onFinish = (info: UserInterface.CreateUser) => {
		info.type = UserInterface.USER_TYPE.ADMIN; // admin
		// request api
		register(info).then(() => {
			notification.success({
				message: '注册成功...',
				duration: 1,
			});
			setTimeout(() => {
				history.push('/login');
			}, 500);
		});
	};
	return (
		<AuthForm
			btnText="立即注册"
			onFinish={onFinish}
			status={Status.Register}
		/>
	);
};

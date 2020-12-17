import React from 'react';
import Auth, { Status } from 'components/Auth';
import { notification } from 'antd';
import { register } from 'core/apis';
import { UserInterface } from 'interfaces/index.interface';

export const NormalRegiterForm = (props) => {
	// 点击注册
	const onFinish = (info: UserInterface.CreateUser) => {
		info.type = UserInterface.USER_TYPE.ADMIN; // admin
		// request api
		register(info).then((res) => {
			notification.success({
				message: '注册成功...',
				duration: 1,
			});
			setTimeout(() => {
				props.history.push('/login');
			}, 500);
		});
	};
	return (
		<Auth btnText="立即注册" onFinish={onFinish} status={Status.Register} />
	);
};

export default NormalRegiterForm;

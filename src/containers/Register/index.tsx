import React from 'react';
import Auth from '../../components/Auth/index';
import { notification } from 'antd';
class NormalRegiterForm extends React.Component<any> {
	// 点击注册
	onFinish = (info) => {
		// request api
		notification.success({
			message: '注册成功，即将跳转登陆...',
			description: '点击立即跳转...',
			duration: 1,
			style: {
				cursor: 'pointer',
			},
		});
		setTimeout(() => {
			this.props.history.push('/login');
		}, 1000);
	};
	render() {
		// showConfirmInput：是否显示确认密码框，注册时候需要
		return (
			<Auth
				loginText="现在登录"
				registerText="立即注册"
				onFinish={this.onFinish}
				showConfirmInput={true}
			/>
		);
	}
}

export default NormalRegiterForm;

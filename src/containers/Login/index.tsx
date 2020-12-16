import React from 'react';
import Auth from 'components/Auth/index';
import { message } from 'antd';
import { login } from 'core/apis';

class NormalLoginForm extends React.Component<any> {
	// 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
	onFinish = (info) => {
		// request api
		console.log(info);

		login(info).then((res) => {
			console.log(res);
			message.success('成功登录');
			this.props.history.push('/dashboard');
		});
	};
	render() {
		return (
			<Auth
				isRegister={false}
				loginText="现在登录"
				registerText="立即注册"
				onFinish={this.onFinish}
			/>
		);
	}
}

export default NormalLoginForm;

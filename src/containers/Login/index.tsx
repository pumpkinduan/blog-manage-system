import React from 'react';
import Auth, { Status } from 'components/Auth';
import { login } from 'core/apis';
import { setLocalStorage } from 'utils';

class NormalLoginForm extends React.PureComponent<any> {
	// 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
	onFinish = async (info) => {
		// request api
		const res = await login(info);
		setLocalStorage('accessToken', res.data?.accessToken);
		this.props.history.push('/dashboard');
	};
	render() {
		return (
			<Auth
				status={Status.Login}
				btnText="现在登录"
				onFinish={this.onFinish}
			/>
		);
	}
}

export default NormalLoginForm;

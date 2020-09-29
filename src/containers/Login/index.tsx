import React from 'react';
import { setLocalStorage } from '../../utils/index';
import Auth from '../../components/Auth/index';
import store from '../../redux/store';
import { showGlobalLoading } from '../../redux/actionCreators/index';
import { message } from 'antd';
class NormalLoginForm extends React.Component<any> {
	// 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
	onFinish = (info) => {
		// request api
		setLocalStorage('auth_token', info);
		setLocalStorage('isAuthencated', true);
		store.dispatch(showGlobalLoading(true));
		setTimeout(() => {
			message.success('成功登录');
			this.props.history.push('/dashboard');
			store.dispatch(showGlobalLoading(false));
			// this.setState({ error: "密码或账号错误" });
		}, 1000);
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

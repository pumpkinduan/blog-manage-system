import React from 'react';
import './index.scss';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { validateUserName, validatePwd } from 'utils/validators';
import BasicFormItem from 'common/BasicFormItem';
/**
 * 该组件(傻瓜组件)思想为:
 * 接受props传递来的数据进行展示，这里不做业务逻辑处理
 */
interface IProps {
	loginText: string;
	registerText: string;
	isRegister: boolean;
	onFinish: (data) => void;
}
class Auth extends React.Component<IProps> {
	// 点击登录，提交的数据被该函数的参数接收，可向后台发送请求
	handleOnFinish = (info) => {
		this.props.onFinish(info);
	};
	render() {
		const { loginText, registerText, isRegister } = this.props;
		return (
			<div className="container">
				<Form className="login-form" onFinish={this.handleOnFinish}>
					<BasicFormItem
						name="account"
						customValidator={validateUserName}
						required={true}
						nonErrMessage="请输入您的用户名或邮箱"
						customController={
							<Input
								prefix={
									<UserOutlined className="site-form-item-icon" />
								}
								placeholder="Username Or Email"
							/>
						}
					/>
					<BasicFormItem
						name="password"
						nonErrMessage="请输入您的密码"
						customValidator={validatePwd}
						required={true}
						customController={
							<Input.Password
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								placeholder="Password"
							/>
						}
					/>
					{isRegister ? (
						<BasicFormItem
							name="confirm"
							dependencies={['password']}
							nonErrMessage="请输入您的确认密码"
							required={true}
							customController={
								<Input.Password
									prefix={
										<LockOutlined className="site-form-item-icon" />
									}
									placeholder="Comfirm Your Password"
								/>
							}
						/>
					) : (
						''
					)}

					<Form.Item>
						<div className="login-form-button-wrapper">
							<Button
								shape="round"
								type="primary"
								block={true}
								htmlType="submit"
								className="login-form-button">
								{loginText}
							</Button>
						</div>
						<div className="register-button-wrapper">
							{/* 这里不用Link组件，在第一次点击跳转时会有闪烁的bug */}
							{!isRegister ? (
								<>
									<span>没有账号?</span>
									<Link
										to={{ pathname: '/register' }}
										className="register-button">
										{registerText}
									</Link>
								</>
							) : (
								<>
									<span>已有账号?</span>
									<Link
										to={{ pathname: '/login' }}
										className="login-button">
										{loginText}
									</Link>
								</>
							)}
						</div>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default Auth;

import React, { useMemo } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { validateEmail, validateNickName, validatePwd } from 'utils/validators';
import BasicFormItem from 'common/BasicFormItem';
import { BasicFormItemProps } from 'common/BasicFormItem/BasicFormItem';
import './style.scss';

/**
 * 该组件(傻瓜组件)思想为:
 * 接受props传递来的数据进行展示，这里不做业务逻辑处理
 */

export enum Status {
	Login,
	Register,
}
interface IProps {
	btnText: string;
	status: Status;
	onFinish: (data) => void;
}
export const AuthForm = ({ btnText, status, onFinish }: IProps) => {
	const isRegister = status === Status.Register;
	const authFormItems: (BasicFormItemProps & {
		generated: boolean;
	})[] = useMemo(() => {
		return [
			{
				generated: isRegister,
				name: 'username',
				customValidator: validateNickName,
				nonErrMessage: '请输入您的用户名',
				customController: (
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
						placeholder="Username"
					/>
				),
			},
			{
				generated: true,
				name: 'email',
				customValidator: validateEmail,
				nonErrMessage: '请输入您的邮箱账号',
				customController: (
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
						placeholder="Email"
					/>
				),
			},
			{
				generated: true,
				name: 'password',
				customValidator: validatePwd,
				nonErrMessage: '请输入您的密码',
				customController: (
					<Input.Password
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
						placeholder="Password"
					/>
				),
			},
			{
				generated: isRegister,
				name: 'confirm',
				customValidator: validatePwd,
				nonErrMessage: '请输入您的确认密码',
				customController: (
					<Input.Password
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
						placeholder="Comfirm Your Password"
					/>
				),
				dependencies: ['password'],
			},
		];
	}, [isRegister]);
	return (
		<div className="container">
			<Form className="login-form" onFinish={onFinish}>
				{authFormItems.map((item, index) => {
					if (!item.generated) return '';
					Reflect.deleteProperty(item, 'generated');
					return <BasicFormItem key={index} {...item} />;
				})}
				<Form.Item>
					<div className="login-form-button-wrapper">
						<Button
							shape="round"
							type="primary"
							block={true}
							htmlType="submit"
							className="login-form-button">
							{btnText}
						</Button>
					</div>
					<div className="register-button-wrapper">
						{!isRegister ? (
							<>
								<span>没有账号?</span>
								<Link
									to={{ pathname: '/register' }}
									className="register-button">
									立即注册
								</Link>
							</>
						) : (
							<>
								<span>已有账号?</span>
								<Link
									to={{ pathname: '/login' }}
									className="login-button">
									立即登录
								</Link>
							</>
						)}
					</div>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AuthForm;

import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { validatorResultProps } from 'utils/validators';
import './index.css';

const { Password } = Input;
export interface BasicFormItemProps extends FormItemProps {
	// 自定义的规则校验器，必须遵循tools文件中validatePwd这类函数返回的格式
	customValidator?: (value: string) => validatorResultProps;
	type?: string; // 输入框类型
	disabled?: boolean; // 是否禁用输入框
	maxLength?: number;
	nonErrMessage?: string; // 输入框为空时，校验失败的报错信息
	size?: any;
	customController?: React.ReactNode;
}
class BasicFormItem extends React.PureComponent<BasicFormItemProps> {
	render() {
		const {
			hasFeedback = true,
			nonErrMessage = '该项必填',
			name,
			type = 'text',
			initialValue,
			disabled,
			maxLength = 63,
			required = true,
			customValidator,
			customController,
			...rest
		} = this.props;
		const MInput = type === 'password' ? Password : Input;
		return (
			<Form.Item
				className="override-ant-form-item "
				initialValue={initialValue}
				hasFeedback={hasFeedback}
				name={name}
				{...rest}
				rules={[
					{ required: required, message: nonErrMessage },
					({ getFieldValue }) => ({
						validator(rule, value) {
							// 若是密码确认框，则校验逻辑不一样
							if (name === 'confirm') {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject('两次输入的密码不一致');
							}
							let res = customValidator
								? customValidator(value)
								: { msg: '', status: true };
							if (!required || !value || res.status) {
								return Promise.resolve();
							}
							return Promise.reject(res.msg);
						},
					}),
				]}
			>
				{customController ? (
					customController
				) : (
					<MInput maxLength={maxLength} disabled={disabled} />
				)}
			</Form.Item>
		);
	}
}
export default BasicFormItem;

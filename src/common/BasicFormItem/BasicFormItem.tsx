import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { validatorResultProps } from 'utils/validators';
import './index.scss';
export interface BasicFormItemProps extends FormItemProps {
	customValidator?: (value: string) => validatorResultProps;
	nonErrMessage?: string; // 输入框为空时，校验失败的报错信息
	customController?: React.ReactNode;
}
class BasicFormItem extends React.PureComponent<BasicFormItemProps> {
	render() {
		const {
			nonErrMessage = '该项必填',
			customValidator,
			customController,
			...rest
		} = this.props;

		return (
			<Form.Item
				required={true}
				hasFeedback={true}
				className="override-ant-form-item"
				{...rest}
				rules={[
					{ required: true, message: nonErrMessage },
					({ getFieldValue }) => ({
						validator(rule, value) {
							// 若是密码确认框，则校验逻辑不一样
							if (rest.name === 'confirm') {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject('两次输入的密码不一致');
							}
							if (!value) {
								return Promise.resolve();
							}
							let res = customValidator
								? customValidator(value)
								: { msg: '', status: true };
							if (res.status) {
								return Promise.resolve();
							}
							return Promise.reject(res.msg);
						},
					}),
				]}>
				{customController ? customController : <Input />}
			</Form.Item>
		);
	}
}
export default BasicFormItem;

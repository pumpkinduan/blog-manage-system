import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import BasicFormItem from 'common/BasicFormItem';
import { Form } from 'antd';
import { validateNickName, validateEmail } from 'utils/validators';
import MarkdownEditor from 'components/ArticleCreate/MarkdownEditor';
import { updateAdminProfile, server } from 'core/apis';
import { AdminProfiles } from 'interfaces/user.interface';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';

const formItemLayout = {
	labelCol: { span: 2 },
	wrapperCol: { md: 8, sm: 12, lg: 6 }
};

const formItems = [
	{
		name: 'nickname',
		customValidator: validateNickName,
		nonErrMessage: '请输入您的昵称',
		label: '昵称'
	},
	{
		name: 'email',
		customValidator: validateEmail,
		nonErrMessage: '请输入您的邮箱',
		label: '邮箱'
	},
	{
		name: 'github',
		nonErrMessage: '请输入您的Github账号',
		label: 'Github'
	},
	{
		name: 'notice',
		label: '公告'
	}
];
export const Settings = () => {
	const [form] = Form.useForm();
	const adminInfo = useSelector(
		(rootState: RootState) => rootState.adminInfo
	);

	const markdownEditorRef = React.createRef<MarkdownEditor>();
	const getContentOnEditor = () => {
		const editor = markdownEditorRef.current?.editor;
		return editor?.markdown(editor.value()); //markdown格式==>html格式
	};
	// 保存信息
	const handleOnSave = async () => {
		const mdContent = getContentOnEditor();
		if (!mdContent) return;
		const profiles = (await form.validateFields()) as AdminProfiles;
		Object.assign(profiles, { brief: mdContent });
		const result = await updateAdminProfile(profiles);
		message.success(result.message);
	};

	useEffect(() => {
		const initFormValues = () => {
			const profiles = adminInfo.profiles;
			if (!profiles) return;
			form.setFieldsValue({
				nickname: profiles.nickname,
				email: adminInfo.email,
				github: profiles.github,
				notice: profiles.notice
			});
		};
		initFormValues();
	}, [adminInfo, form]);

	return (
		<>
			<Form form={form} {...formItemLayout} labelAlign="left">
				{formItems.map((item, index) => (
					<BasicFormItem key={index} {...item} />
				))}
			</Form>
			<Form.Item
				labelCol={formItemLayout.labelCol}
				labelAlign="left"
				label="关于我"
				required>
				<MarkdownEditor
					ref={markdownEditorRef}
					content={adminInfo.profiles?.brief}
				/>
			</Form.Item>
			<Button
				shape="round"
				type="primary"
				onClick={handleOnSave}
				style={{ position: 'relative', top: '-40px' }}>
				保存
			</Button>
		</>
	);
};

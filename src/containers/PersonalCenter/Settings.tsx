import React, { useEffect } from 'react';
import { Upload, Button, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BasicFormItem from 'common/BasicFormItem';
import { Form } from 'antd';
import { validateNickName, validateEmail } from 'utils/validators';
import MarkdownEditor from 'components/ArticleCreate/MarkdownEditor';
import { updateAdminProfile, server } from 'core/apis';
import { AdminProfiles } from 'interfaces/user.interface';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { PhotoInterface } from 'interfaces/index.interface';
import { BasicUpload } from 'components/BasicUpload';

const formItemLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 10 },
};

const formItems = [
	{
		name: 'nickname',
		customValidator: validateNickName,
		nonErrMessage: '请输入您的昵称',
		label: '昵称',
	},
	{
		name: 'email',
		customValidator: validateEmail,
		nonErrMessage: '请输入您的邮箱',
		label: '邮箱',
	},
	{
		name: 'github',
		nonErrMessage: '请输入您的Github账号',
		label: 'Github',
	},
	{
		name: 'notice',
		label: '公告',
	},
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
	console.log('adminInfo', adminInfo);

	// 保存信息
	const save = async () => {
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
				notice: profiles.notice,
			});
		};
		initFormValues();
	}, [adminInfo, form]);

	return (
		<div>
			<Form form={form} {...formItemLayout} labelAlign="left">
				{formItems.map((item, index) => (
					<BasicFormItem
						key={index}
						{...item}
						wrapperCol={{ md: 10, span: 6, lg: 4 }}
					/>
				))}
			</Form>
			<Row align="middle" gutter={10} style={{ margin: '15px 0' }}>
				<Col>
					<BasicUpload
						listType="picture"
						key="upload"
						name="file"
						placehloder="更换头像"
						data={{
							type: PhotoInterface.PHOTO_TYPE.AVATAR,
							userId: adminInfo.id,
						}}
					/>
				</Col>
				<Col>
					<Button shape="round" type="primary" onClick={save}>
						保存
					</Button>
				</Col>
			</Row>
			<Form.Item
				label="关于我"
				required
				style={{ marginBottom: '10px' }}></Form.Item>
			<MarkdownEditor
				ref={markdownEditorRef}
				content={adminInfo.profiles?.brief}
			/>
		</div>
	);
};

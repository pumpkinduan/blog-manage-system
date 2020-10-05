import React from "react";
import { Upload, Button, Row, Col, message } from "antd";
import { articleProps } from "types/Article";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import BasicFormItem from "common/BasicFormItem";
import { Form } from "antd";
import { validateNickName, validateEmail } from "utils/validators";
import MarkdownEditor from "components/ArticleCreate/MarkdownEditor";
const formItemLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 10 },
};
export const Settings = () => {
	const [form] = Form.useForm();
	const markdownEditorRef = React.createRef<MarkdownEditor>();
	const getContentOnEditor = () => {
		const editor = markdownEditorRef.current?.editor;
		return editor?.markdown(editor.value()); //markdown格式==>html格式
	};
	// 保存信息
	const save = () => {
		const mdContent = getContentOnEditor();
		form.validateFields().then((profiles) => {
			if (!mdContent) return;
			Object.assign(profiles, { brief: mdContent });
			console.log("====================================");
			console.log(profiles);
			console.log("====================================");
		});
	};
	return (
		<div>
			<Form
				form={form}
				{...formItemLayout}
				labelAlign="left"
				layout="vertical"
			>
				<BasicFormItem
					name="nickname"
					customValidator={validateNickName}
					nonErrMessage="请输入您的昵称"
					label="昵称"
				/>
				<BasicFormItem
					name="email"
					label="邮箱"
					customValidator={validateEmail}
					nonErrMessage="请输入您的邮箱"
				/>
				<BasicFormItem
					name="github"
					label="Github账号"
					nonErrMessage="请输入您的Github账号"
				/>
			</Form>
			<Row align="middle" gutter={10} style={{ margin: "15px 0" }}>
				<Col>
					<Upload
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						//   fileList={fileList}
						//   onChange={this.handleChange}
					>
						<Button icon={<UploadOutlined />}>更换头像</Button>
					</Upload>
				</Col>
				<Col>
					<img
						className="avatar"
						src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
						alt=""
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
				style={{ marginBottom: "10px" }}
			></Form.Item>
			<MarkdownEditor
				ref={markdownEditorRef}
				content={`<h3 id="ssssg">ssssg</h3>
							<blockquote>
							<p>khsg</p>
							</blockquote>`}
			/>
		</div>
	);
};

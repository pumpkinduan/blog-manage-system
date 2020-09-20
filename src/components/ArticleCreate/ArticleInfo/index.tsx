import React from "react";
import CustomInput from "common/Input/index";
import "./index.scss";
import { Form, Popconfirm, message } from "antd";
import {
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
} from "utils/index";
import { FormInstance } from "antd/lib/form";
const { Item } = Form;
const items = [
	{
		name: "title",
		className: "article-title",
		children: (
			<CustomInput
				placeholder="请拟个文章标题"
				width="40%"
				prefix="Title:"
			/>
		),
	},
	{
		name: "author",
		className: "article-author",
		children: (
			<CustomInput
				placeholder="请输入作者"
				width="20%"
				prefix="Author:"
			/>
		),
	},
	{
		name: "tag",
		className: "article-tag",
		children: (
			<CustomInput
				placeholder="请输入文章分类"
				width="20%"
				prefix="Tag:"
			/>
		),
	},
	{
		name: "description",
		className: "article-description",
		children: (
			<CustomInput placeholder="请简要描述文章" prefix="Description:" />
		),
	},
];
const validateMessages = {
	required: "'${name}'不能为空噢~",
};
class ArticleInfo extends React.PureComponent {
	formRef: React.RefObject<FormInstance> = React.createRef<FormInstance>();
	componentDidMount() {
		let article_sub_info = getLocalStorage("article_sub_info");
		if (!article_sub_info) return;
		this.formRef.current?.setFieldsValue(article_sub_info);
	}
	getFormInstance = () => {
		return this.formRef.current;
	};
	confirm = (e) => {
		message.success("已清空文章信息");
		this.onReset();
	};
	cancel = (e) => {
		message.error("您已取消");
	};
	onReset = () => {
		// clear the values of title, tag, author and description on storage and UI
		this.formRef.current?.resetFields();
		removeLocalStorage("article_sub_info");
	};
	onValuesChange = (changedValues, allValues) => {
		setLocalStorage("article_sub_info", allValues);
	};
	render() {
		return (
			<Form
				validateMessages={validateMessages}
				onValuesChange={this.onValuesChange}
				ref={this.formRef}
				className="articl-info-container"
			>
				{items.map((item) => (
					<Item
						key={item.name}
						name={item.name}
						className={item.className}
						rules={[
							{
								required: true,
							},
						]}
					>
						{item.children}
					</Item>
				))}
			</Form>
		);
	}
}
export default ArticleInfo;

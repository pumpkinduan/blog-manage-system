import React from "react";
import CustomInput from "common/Input/index";
import { Form, Select, Tag } from "antd";
import {
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
} from "utils/index";
import { FormInstance } from "antd/lib/form";
import BasicFormItem from "common/BasicFormItem";
import "./index.scss";
const { Option } = Select;
const options = [
	{ value: "NodeJs" },
	{ value: "JavaScript" },
	{ value: "日常" },
	{ value: "CSS" },
	{ value: "React" },
	{ value: "VueJs" },
];
const tagRender = (props) => {
	const { label, value, closable, onClose } = props;
	return (
		<Tag color="purple" closable={closable} onClose={onClose}>
			{props.label}
		</Tag>
	);
};
const items = [
	{
		name: "title",
		className: "article-title",
		label: "Title",
		controller: <CustomInput placeholder="请拟个文章标题" width="40%" />,
	},
	{
		name: "author",
		className: "article-author",
		label: "Title",
		controller: <CustomInput placeholder="请输入作者" width="20%" />,
	},
	{
		name: "tag",
		className: "article-tag",
		label: "Tags",
		controller: (
			<Select
				bordered={false}
				dropdownClassName="custom-dropdown"
				mode="tags"
				style={{ width: "50%" }}
				placeholder="分类"
				tagRender={tagRender}
				options={options}
			></Select>
		),
	},
	{
		name: "description",
		label: "Description",
		className: "article-description",
		controller: <CustomInput placeholder="请简要描述文章" />,
	},
];
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
	onValuesChange = (changedValues, allValues) => {
		setLocalStorage("article_sub_info", allValues);
	};
	render() {
		return (
			<Form
				onValuesChange={this.onValuesChange}
				ref={this.formRef}
				className="articl-info-container"
			>
				{items.map((item) => (
					<BasicFormItem
						label={item.label}
						hasFeedback={false}
						required={true}
						key={item.name}
						name={item.name}
						customController={item.controller}
					/>
				))}
			</Form>
		);
	}
}
export default ArticleInfo;

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
import QueueAnim from "rc-queue-anim";
interface Props {
	getChildInstance: (childInstance: ArticleInfo) => void;
}
class ArticleInfo extends React.PureComponent<Props> {
	formRef: React.RefObject<FormInstance> = React.createRef<FormInstance>();
	componentDidMount() {
		this.props.getChildInstance(this);
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
			<QueueAnim interval={200}>
				<Form
					key={0}
					onValuesChange={this.onValuesChange}
					ref={this.formRef}
					className="articl-info-container"
				>
					<Form.Item
						name="title"
						className="article-title"
						rules={[
							{
								required: true,
							},
						]}
					>
						<CustomInput
							placeholder="请拟个文章标题"
							width="40%"
							prefix="Title:"
						/>
					</Form.Item>
					<Form.Item
						name="author"
						className="article-author"
						rules={[
							{
								required: true,
							},
						]}
					>
						<CustomInput
							placeholder="请输入作者"
							width="20%"
							prefix="Author:"
						/>
					</Form.Item>
					<Form.Item
						name="tag"
						className="articla-tag"
						rules={[
							{
								required: true,
							},
						]}
					>
						<CustomInput
							placeholder="请输入文章分类"
							width="20%"
							prefix="Tag:"
						/>
					</Form.Item>
					<Form.Item
						name="description"
						className="article-description"
						rules={[
							{
								required: true,
							},
						]}
					>
						<CustomInput
							placeholder="请简要描述文章"
							prefix="Description:"
						/>
					</Form.Item>
					<Form.Item className="reset-btn">
						<Popconfirm
							title="是否清空文章信息？"
							onConfirm={this.confirm}
							onCancel={this.cancel}
							okText="Yes"
							cancelText="No"
						>
							<span>Reset</span>
						</Popconfirm>
					</Form.Item>
				</Form>
			</QueueAnim>
		);
	}
}
export default ArticleInfo;

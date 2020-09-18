import React, { Component } from "react";
import {
	getLocalStorage,
	setLocalStorage,
	removeLocalStorage,
} from "utils/index";
import "./index.scss";
import { Modal, notification } from "antd";
import ArticleInfo from "components/ArticleCreate/ArticleInfo/index";
import ArticleEditor from "components/ArticleCreate/ArticleEditor/index";
import PicturesWall from "components/Upload/index";
import ArticleControl from "components/ArticleCreate/ArticleControl/index";
import { FormInstance } from "antd/lib/form";
class ArticleCreate extends Component<any, any> {
	state: any = {
		// isSwitch来控制显示哪种类型的编辑器
		// true为富文本; false为markdown
		isSwitch: getLocalStorage("isSwitch"),

		currentEditor: null,
		// 与文章相关的数据
		article_sub_info: null, // 文章的次要信息，如标题 作者...
		content: "", // html格式的内容，展示于前端网站中 保存至数据库
		previewContent: "", // html格式的内容，在后台预览 不用保存至数据库
		markedContent: "", // markdown格式的内容，用于展示在后台管理系统中 保存至数据库
		isPreview: false,
		coverUrl: "",
	};
	formInstance: FormInstance | null = null;
	componentDidMount() {
		if (this.props.isEdited) {
			// api
		}
	}
	// 获取子组件实例
	getChildInstance = (childInstance: ArticleInfo) => {
		console.log(childInstance.getFormInstance());

		this.formInstance = childInstance.getFormInstance();
	};
	// 控制预览的模态框显示
	handleOk = (e) => {
		this.setState({
			isPreview: false,
		});
	};
	// 控制预览的模态框显示
	handleCancel = (e) => {
		this.setState({
			isPreview: false,
		});
	};
	// 显示预览的模态框
	onPreview = () => {
		this.setState({
			isPreview: true,
			previewContent: getLocalStorage("rich_text"),
		});
	};
	onPublish = (status) => {
		// post
		let { coverUrl, currentEditor } = this.state;
		if (!currentEditor) return;
		this.formInstance?.validateFields().then(
			(vals) => {
				// 处理富文本与markdown编辑器获取内容的方式
				let content = "",
					markedContent = "";
				if (currentEditor.txt) {
					content = currentEditor.txt.html();
				} else {
					markedContent = currentEditor.value();
					// 前端部分获取markdown写的内部必须放以 <div class="editor-preview editor-preview-side"></div>为根节点
					content = currentEditor.markdown(markedContent);
				}
				if (content !== "") {
					let data = Object.assign(vals, {
						content,
						status,
						coverUrl,
						markedContent,
					});

					// post data
					// setLocalStorage("text", content);
					this.clearAllContent();
					notification.success({
						message: status,
						duration: 1,
						style: {
							cursor: "pointer",
						},
					});
				} else {
					notification.warn({
						message: "文章内容不能为空噢~",
						duration: 1,
						style: {
							cursor: "pointer",
						},
					});
				}
			},
			(err) => {
				console.log(err);
			}
		);
	};
	setCurrentEditor = (editor) => {
		this.setState({ currentEditor: editor });
	};
	// 切换编辑器
	toggleEditor = () => {
		let isSwitch = !this.state.isSwitch;
		setLocalStorage("isSwitch", isSwitch);
		this.setState({
			isSwitch,
		});
	};
	clearAllContent = () => {
		let { isSwitch, currentEditor } = this.state;
		// 清空编辑器
		if (isSwitch) {
			currentEditor.txt.html("");
			removeLocalStorage("rich_text"); // 富文本编辑器的缓存内容
		} else {
			removeLocalStorage("smde_marked_text"); // markdown编辑器的缓存内容
			currentEditor.value("");
		}
		this.formInstance?.resetFields();
		removeLocalStorage("article_sub_info");
	};

	// 获取上传的图片信息
	getUploadData = (fileList) => {
		console.log(fileList);
	};
	render() {
		const {
			previewContent,
			isPreview,
			isSwitch,
			article_sub_info,
		} = this.state;
		return (
			<div className="article-create-container">
				<Modal
					title="预览文章"
					visible={isPreview}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<div
						dangerouslySetInnerHTML={{ __html: previewContent }}
					></div>
				</Modal>
				<ArticleInfo
					getChildInstance={this.getChildInstance}
					// article_sub_info={article_sub_info}
				/>
				<div className="article-cover">
					<PicturesWall
						getUploadData={this.getUploadData}
						placehloder="上传文章封面"
					/>
				</div>
				<ArticleControl
					onPreview={this.onPreview}
					onPublish={this.onPublish}
					toggleEditor={this.toggleEditor}
				/>
				<ArticleEditor
					isSwitch={isSwitch}
					setCurrentEditor={this.setCurrentEditor}
				/>
			</div>
		);
	}
}
export default ArticleCreate;

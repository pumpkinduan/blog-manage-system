import React, { Component } from "react";
import {
	getLocalStorage,
	setLocalStorage,
	removeLocalStorage,
} from "utils/index";
import "./index.scss";
import { Modal, notification } from "antd";
import ArticleInfo from "components/ArticleCreate/ArticleInfo/index";
import PicturesWall from "components/Upload/index";
import ArticleControl from "components/ArticleCreate/ArticleControl/index";
import RichEditor from "components/ArticleCreate/RichEditor/index";
import MarkdownEditor from "components/ArticleCreate/MarkdownEditor/index";
import { articleProps } from "types/Article";
import { FormInstance } from "antd/lib/form";
class ArticleCreate extends Component<any, any> {
	state: any = {
		// isRichEditor来控制显示哪种类型的编辑器
		// true为富文本; false为markdown
		isRichEditor: true,

		// 与文章相关的数据
		article_sub_info: null, // 文章的次要信息，如标题 作者...
		content: "", // html格式的内容，展示于前端网站中 保存至数据库
		previewContent: "", // html格式的内容，在后台预览 不用保存至数据库
		isPreview: false,
		coverUrl: "",
	};
	richEditorRef: React.RefObject<RichEditor> = React.createRef<RichEditor>();
	markdownEditorRef: React.RefObject<MarkdownEditor> = React.createRef<
		MarkdownEditor
	>();
	articleInfoRef: React.RefObject<ArticleInfo> = React.createRef<
		ArticleInfo
	>();
	componentDidMount() {
		if (this.props.isEdited) {
			// api
		}
	}
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
	// TODO: 获取当前使用的编辑器，富文本或markdown
	getCurrentEditor = () => {
		if (this.state.isRichEditor) return this.richEditorRef.current?.editor;
		return this.markdownEditorRef.current?.editor;
	};
	// TODO: 获取在编辑器中写的内容
	getContentOnEditor = () => {
		let currentEditor = this.getCurrentEditor();
		return this.state.isRichEditor
			? currentEditor.txt.html()
			: currentEditor.markdown(currentEditor.value()); //markdown格式==>html格式
	};
	onPublish = (status) => {
		// post
		let { coverUrl } = this.state;
		let currentEditor = this.getCurrentEditor();
		if (!currentEditor) return;
		this.articleInfoRef.current
			?.getFormInstance()
			?.validateFields()
			.then(
				(vals) => {
					let content = this.getContentOnEditor();
					if (content !== "") {
						let data = Object.assign(vals, {
							content,
							status,
							coverUrl,
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
	// 切换编辑器
	toggleEditor = () => {
		this.setState({
			isRichEditor: !this.state.isRichEditor,
		});
	};
	// 清空文章信息
	clearAllContent = () => {
		let { isRichEditor } = this.state;
		let currentEditor = this.getCurrentEditor();
		// 清空编辑器
		if (isRichEditor) {
			currentEditor.txt.html("");
			removeLocalStorage("rich_text"); // 富文本编辑器的缓存内容
		} else {
			removeLocalStorage("smde_marked_text"); // markdown编辑器的缓存内容
			currentEditor.value("");
		}
		this.articleInfoRef.current?.getFormInstance()?.resetFields();
		removeLocalStorage("article_sub_info");
	};
	// 获取上传的图片信息
	getUploadData = (fileList) => {
		console.log(fileList);
	};
	render() {
		const { previewContent, isPreview, isRichEditor, content } = this.state;
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
				<ArticleInfo ref={this.articleInfoRef} />
				<div className="article-cover">
					<PicturesWall
						getUploadData={this.getUploadData}
						placehloder="上传文章封面"
					/>
				</div>
				<ArticleControl
					clearAllContent={this.clearAllContent}
					onPreview={this.onPreview}
					onPublish={this.onPublish}
					toggleEditor={this.toggleEditor}
				/>
				<div className="editor-container">
					{isRichEditor ? (
						<RichEditor ref={this.richEditorRef} content="" />
					) : (
						<MarkdownEditor
							ref={this.markdownEditorRef}
							content={`<h3 id="ssssg">ssssg</h3>
							<blockquote>
							<p>khsg</p>
							</blockquote>`}
						/>
					)}
				</div>
			</div>
		);
	}
}
export default ArticleCreate;

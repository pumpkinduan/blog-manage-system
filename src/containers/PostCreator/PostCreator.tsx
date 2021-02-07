import React, { useState, useRef } from 'react';
import { RichEditor, Some_APIS } from 'components/Editor';
import { PostProfile, PostProfileExposed } from './components/PostProfile';
import { BasicUpload } from 'components/BasicUpload';
import './style.scss';

const PostCreator = () => {
	const refEditor = useRef<Some_APIS>();
	const refPostProfile = useRef<PostProfileExposed>();

	// 	// 与文章相关的数据
	// 	content: '', // html格式的内容，展示于前端网站中 保存至数据库
	// 	previewContent: '', // html格式的内容，在后台预览 不用保存至数据库
	// 	isPreview: false,
	// 	coverUrl: ''
	// };

	// 控制预览的模态框显示
	// const handleOk = (e) => {
	// 	this.setState({
	// 		isPreview: false
	// 	});
	// };
	// // 控制预览的模态框显示
	// const	handleCancel = (e) => {
	// 	this.setState({
	// 		isPreview: false
	// 	});
	// };
	// // 显示预览的模态框
	// const	onPreview = () => {
	// 	this.setState({
	// 		isPreview: true,
	// 		previewContent: getLocalStorage('rich_text')
	// 	});
	// };
	// // TODO: 获取当前使用的编辑器，富文本或markdown
	// const	getCurrentEditor = () => {
	// 	if (this.state.isRichEditor)
	// 		return this.richEditorRef.current?.getEditorInstance();
	// 	return this.markdownEditorRef.current?.editor;
	// };
	// // TODO: 获取在编辑器中写的内容
	// constgetContentOnEditor = () => {
	// 	let currentEditor = this.getCurrentEditor();
	// 	return this.state.isRichEditor
	// 		? currentEditor.txt.text()
	// 		: currentEditor.markdown(currentEditor.value()); //markdown格式==>html格式
	// };
	// // 输入的内容为空格
	// const	isBlankSpace = (value) => {
	// 	const reg = /^(&nbsp;)+$/;
	// 	return reg.test(value);
	// };
	// const	onPublish = (status) => {
	// 	// post
	// 	let { coverUrl } = this.state;
	// 	let currentEditor = this.getCurrentEditor();
	// 	if (!currentEditor) return;
	// 	this.articleInfoRef.current
	// 		?.getFormInstance()
	// 		?.validateFields()
	// 		.then(
	// 			(vals) => {
	// 				let content = this.getContentOnEditor();
	// 				if (!content) return;
	// 				let data = Object.assign(vals, {
	// 					content,
	// 					status,
	// 					coverUrl
	// 				});

	// 				// post data
	// 				// setLocalStorage("text", content);
	// 				this.clearAllContent();
	// 				notification.success({
	// 					message: status,
	// 					duration: 1,
	// 					style: {
	// 						cursor: 'pointer'
	// 					}
	// 				});
	// 			},
	// 			(err) => {
	// 				console.log(err);
	// 			}
	// 		);
	// };
	// // 清空文章信息
	// const	clearAllContent = () => {
	// 	let { isRichEditor } = this.state;
	// 	let currentEditor = this.getCurrentEditor();
	// 	// 清空编辑器
	// 	if (isRichEditor) {
	// 		currentEditor.txt.text('写点东西吧...');
	// 		removeLocalStorage('rich_text'); // 富文本编辑器的缓存内容
	// 	} else {
	// 		removeLocalStorage('smde_marked_text'); // markdown编辑器的缓存内容
	// 		currentEditor.value('');
	// 	}
	// 	this.articleInfoRef.current?.getFormInstance()?.resetFields();
	// 	removeLocalStorage('article_sub_info');
	// };
	// // 获取上传的图片信息
	// const getUploadData = (fileList) => {
	// 	console.log(fileList);
	// };
	return (
		<div className="article-create-container">
			<PostProfile ref={refPostProfile} />
			<div className="article-cover" style={{ marginBottom: '16px' }}>
				<BasicUpload placehloder="上传文章封面" />
			</div>

			<div className="editor-container">
				<RichEditor ref={refEditor} content="" />
			</div>
			<div className="article-controls">
				<span key="post" className="post-btn btn" onClick={() => {}}>
					Publish
				</span>
				<span key="draft" className="draft-btn btn" onClick={() => {}}>
					Draft
				</span>
			</div>
		</div>
	);
};
export default PostCreator;
